import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export class FlapMail implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FlapMail',
		name: 'flapMail',
		icon: 'file:flapmail.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Send messages through FlapMail',
		defaults: {
			name: 'FlapMail',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'flapMailApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send',
						value: 'send',
						action: 'Send a message',
					},
				],
				default: 'send',
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'HTML', value: 'html' },
					{ name: 'Text', value: 'text' },
				],
				default: 'html',
				displayOptions: { show: { operation: ['send'] } },
			},
			{ displayName: 'Name', name: 'name', type: 'string', default: '', displayOptions: { show: { operation: ['send'] } } },
			{ displayName: 'Email', name: 'email', type: 'string', default: '', displayOptions: { show: { operation: ['send'] } } },
			{ displayName: 'Subject', name: 'subject', type: 'string', default: '', required: true, displayOptions: { show: { operation: ['send'] } } },
			{ displayName: 'Category', name: 'category', type: 'string', default: '', displayOptions: { show: { operation: ['send'] } } },
			{ displayName: 'Department', name: 'department', type: 'string', default: '', displayOptions: { show: { operation: ['send'] } } },
			{ displayName: 'Message', name: 'message', type: 'string', typeOptions: { rows: 6 }, default: '', required: true, displayOptions: { show: { operation: ['send'] } } },
			{
				displayName: 'Attachment Binary Property',
				name: 'attachmentBinaryProperty',
				type: 'string',
				default: '',
				placeholder: 'data',
				description: 'Name of the binary property containing a file attachment',
				displayOptions: { show: { operation: ['send'] } },
			},
			{
				displayName: 'Additional Fields JSON',
				name: 'additionalFieldsJson',
				type: 'json',
				default: '{}',
				displayOptions: { show: { operation: ['send'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('flapMailApi');
		const baseUrl = String(credentials.baseUrl || '').replace(/\/$/, '');
		const endpointPath = String(credentials.endpointPath || '');
		const token = String(credentials.token || '');
		const url = `${baseUrl}${endpointPath}`;

		for (let i = 0; i < items.length; i++) {
			try {
				const format = this.getNodeParameter('format', i) as string;
				const name = this.getNodeParameter('name', i, '') as string;
				const email = this.getNodeParameter('email', i, '') as string;
				const subject = this.getNodeParameter('subject', i) as string;
				const category = this.getNodeParameter('category', i, '') as string;
				const department = this.getNodeParameter('department', i, '') as string;
				const message = this.getNodeParameter('message', i) as string;
				const attachmentBinaryProperty = this.getNodeParameter('attachmentBinaryProperty', i, '') as string;
				const additionalFieldsJson = this.getNodeParameter('additionalFieldsJson', i, '{}') as string;

				let additionalFields: IDataObject = {};
				if (additionalFieldsJson && additionalFieldsJson.trim()) {
					additionalFields = JSON.parse(additionalFieldsJson) as IDataObject;
				}

				const formData = new FormData();
				formData.append('token', token);
				formData.append('format', format);
				if (name) formData.append('name', name);
				if (email) formData.append('email', email);
				if (subject) formData.append('subject', subject);
				if (category) formData.append('category', category);
				if (department) formData.append('department', department);
				if (message) formData.append('message', message);

				for (const [key, value] of Object.entries(additionalFields)) {
					if (value !== undefined && value !== null) {
						formData.append(key, String(value));
					}
				}

				if (attachmentBinaryProperty) {
					const binaryData = await this.helpers.getBinaryDataBuffer(i, attachmentBinaryProperty);
					const binaryMeta = items[i].binary?.[attachmentBinaryProperty];
					const fileName = binaryMeta?.fileName || 'attachment.bin';
					const mimeType = binaryMeta?.mimeType || 'application/octet-stream';
					const blob = new Blob([binaryData], { type: mimeType });
					formData.append('attachment', blob, fileName);
				}

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url,
					body: formData,
					json: false,
					returnFullResponse: true,
				});

				returnData.push({
					json: {
						success: true,
						statusCode: response.statusCode,
						body: response.body as JsonObject,
					},
					pairedItem: i,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							success: false,
							error: (error as Error).message,
						},
						pairedItem: i,
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
