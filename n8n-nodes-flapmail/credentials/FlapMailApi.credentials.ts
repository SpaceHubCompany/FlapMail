import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class FlapMailApi implements ICredentialType {
	name = 'flapMailApi';
	displayName = 'FlapMail API';
	documentationUrl = 'https://github.com/SpaceHubCompany/FlapMail';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.flapmail.net',
			required: true,
		},
		{
			displayName: 'Endpoint Path',
			name: 'endpointPath',
			type: 'string',
			default: '/api/submit.php',
			required: true,
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];
}
