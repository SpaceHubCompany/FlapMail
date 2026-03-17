import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;

public class SendAttachedFile {
    // Gere uma chave Token e coloque aqui
    private static final String FLAPMAIL_TOKEN = "ms_replace_with_your_token";
    private static final String ENDPOINT = "https://app.flapmail.net/api/submit.php";

    private static boolean isValidEmail(String email) {
        return email != null && email.matches("^[^\s@]+@[^\s@]+\.[^\s@]+$");
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        String email = "alex@example.com";
        if (!isValidEmail(email)) {
            System.out.println("Please enter a valid email address.");
            return;
        }
        Path filePath = Path.of("sample_attachment.txt");
        if (!Files.exists(filePath)) {
            Files.writeString(filePath, "Sample attachment for the FlapMail Java example.");
        }
        if (Files.size(filePath) > 3 * 1024 * 1024) {
            System.out.println("The selected file exceeds the 3 MB limit.");
            return;
        }
        String boundary = "----FlapMailBoundary" + System.currentTimeMillis();
        String CRLF = "
";
        StringBuilder builder = new StringBuilder();
        Map<String, String> payload = new LinkedHashMap<>();
        payload.put("name", "Alex Johnson");
        payload.put("email", email);
        payload.put("message", "Please review the attached file.");
        payload.put("token", FLAPMAIL_TOKEN);
        payload.put("form_type", "docs");
        // format can be 'html' or 'text'
        payload.put("format", "html");
        for (Map.Entry<String, String> entry : payload.entrySet()) {
            builder.append("--").append(boundary).append(CRLF);
            builder.append("Content-Disposition: form-data; name="").append(entry.getKey()).append(""").append(CRLF).append(CRLF);
            builder.append(entry.getValue()).append(CRLF);
        }
        byte[] fileBytes = Files.readAllBytes(filePath);
        byte[] prefix = builder.toString().getBytes(StandardCharsets.UTF_8);
        byte[] fileHeader = ("--" + boundary + CRLF +
                "Content-Disposition: form-data; name="file"; filename="" + filePath.getFileName() + """ + CRLF +
                "Content-Type: application/octet-stream" + CRLF + CRLF).getBytes(StandardCharsets.UTF_8);
        byte[] suffix = (CRLF + "--" + boundary + "--" + CRLF).getBytes(StandardCharsets.UTF_8);
        byte[] body = new byte[prefix.length + fileHeader.length + fileBytes.length + suffix.length];
        System.arraycopy(prefix, 0, body, 0, prefix.length);
        System.arraycopy(fileHeader, 0, body, prefix.length, fileHeader.length);
        System.arraycopy(fileBytes, 0, body, prefix.length + fileHeader.length, fileBytes.length);
        System.arraycopy(suffix, 0, body, prefix.length + fileHeader.length + fileBytes.length, suffix.length);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(ENDPOINT))
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.ofByteArray(body))
                .build();
        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
