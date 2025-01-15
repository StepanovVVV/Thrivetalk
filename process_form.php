<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $phone = htmlspecialchars($_POST['phone']);

        $date = date("Y-m-d H:i:s");

        $file = 'submissions.txt';

        $data = "Date: $date\nName: $name\nEmail: $email\nPhone: $phone\n---\n";

        file_put_contents($file, $data, FILE_APPEND);

        // Email to
        $to = "vladyslav.s@thewhitelabelagency.com";
        $subject = "New form submission";
        $message = "You have received a new form submission:\n\n" . $data;
        // Domain from
        $headers = "From: no-reply@yourdomain.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send email.";
        }

        // Send message to Telegram
        $telegramToken = "8037835641:AAGgdpixuF6nEE42cBR73jVzXXV-V9-4tcQ"; // Replace with your token
        $chatId = "547849987"; // Replace with your chat_id
        $telegramMessage = "New form submission:\n\n" . $data;

        // URL for sending a message in Telegram
        $url = "https://api.telegram.org/bot$telegramToken/sendMessage?chat_id=$chatId&text=" . urlencode($telegramMessage);

        // Send a request to Telegram
        file_get_contents($url);

        $base_path = '/thank-you';
        $extensions = ['.html', '.php', '.htm'];

        foreach ($extensions as $ext) {
            if (file_exists(__DIR__ . $base_path . $ext)) {
                header("Location: $base_path$ext");
                exit();
            }
        }

        header("Location: /404");
        exit();
    } else {
        echo "Invalid request method";
    }
?>