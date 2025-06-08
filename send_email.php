<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the Composer autoloader (if you are using Composer)
require 'vendor/autoload.php';

// Get form data
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zip = $_POST['zip'];
$country = $_POST['country'];
$phone = $_POST['phone'];
$mailingAddress = $_POST['mailing-address'];
$mailingEmail = isset($_POST['mailing-email']) ? $_POST['mailing-email'] : '';

// Admin's email address
$adminEmail = 'admin@example.com';

try {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    // Set mailer to use SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com';  // Set the SMTP server (e.g., Gmail, your mail provider)
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@example.com';  // SMTP username
    $mail->Password = 'your_password';  // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Set the sender's email address
    $mail->setFrom('no-reply@example.com', 'Registration System');
    
    // Add recipient (admin email)
    $mail->addAddress($adminEmail);

    // Set email subject
    $mail->Subject = 'New Registration Form Submission';

    // Create the email body
    $body = "
    <h3>Registration Form Submission</h3>
    <p><strong>First Name:</strong> $firstName</p>
    <p><strong>Last Name:</strong> $lastName</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Street Address:</strong> $address</p>
    <p><strong>City:</strong> $city</p>
    <p><strong>State:</strong> $state</p>
    <p><strong>Zip Code:</strong> $zip</p>
    <p><strong>Country:</strong> $country</p>
    <p><strong>Phone Number:</strong> $phone</p>
    <p><strong>Mailing Address:</strong> $mailingAddress</p>
    <p><strong>Mailing Email:</strong> $mailingEmail</p>
    ";

    // Set email format to HTML
    $mail->isHTML(true);

    // Set the email body content
    $mail->Body = $body;

    // Send the email
    $mail->send();

    // Return success response
    echo json_encode(['status' => 'success']);
} catch (Exception $e) {
    // Return error response
    echo json_encode(['status' => 'error', 'message' => $mail->ErrorInfo]);
}
?>
