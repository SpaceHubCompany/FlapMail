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

public class HrForm {
    // Gere uma chave Token e coloque aqui
    private static final String FLAPMAIL_TOKEN = "ms_replace_with_your_token";
    private static final String ENDPOINT = "https://app.flapmail.net/api/submit.php";

    private static boolean isValidEmail(String email) {
        return email != null && email.matches("^[^\s@]+@[^\s@]+\.[^\s@]+$");
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        Map<String, String> payload = new LinkedHashMap<>();
        payload.put("name", "Alex Johnson");
        payload.put("email", "alex@example.com");
        payload.put("position", "Software Engineer");
        payload.put("work_model", "Remote");
        payload.put("linkedin", "https://www.linkedin.com/in/example");
        payload.put("message", "I would like to apply for this role.");
        if (!isValidEmail(payload.get("email"))) {
            System.out.println("Please enter a valid email address.");
            return;
        }
        payload.put("token", FLAPMAIL_TOKEN);
        // format can be 'html' or 'text'
        payload.put("format", "html");
        StringBuilder form = new StringBuilder();
        for (Map.Entry<String, String> entry : payload.entrySet()) {
            if (form.length() > 0) form.append("&");
            form.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            form.append("=");
            form.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
        }
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(ENDPOINT))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(form.toString()))
                .build();
        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
