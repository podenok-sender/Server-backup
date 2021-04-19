<?php



//echo newmail('1тест','dfgdfg','1');

function newmail($subject,$message,$path){
// Passing `true` enables exceptions
require '../PHPmailer/PHPMailer.php';
require '../PHPmailer/SMTP.php';
require '../PHPmailer/Exception.php';
require '../../config.php';

try {


    $mail = new PHPMailer\PHPMailer\PHPMailer(true);                              

    
    //Server settings
    $mail->setLanguage('ru', '../../vendor/phpmailer/phpmailer/language/'); // Перевод на русский язык
   
    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
   
    $mail->SMTPAuth = true;                               // Enable SMTP authentication

    //$mail->SMTPSecure = 'ssl';                          // secure transfer enabled REQUIRED for Gmail
    //$mail->Port = 465;                                  // TCP port to connect to
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
   
    $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->Username = $emailfrom;             // SMTP username
    $mail->Password = $emailpassword;                   // SMTP password
   
    
    $mail->CharSet = 'UTF-8';	
    //Recipients
    $mail->setFrom($emailfrom);
   // $mail->ClearAddresses(); 
   	$mail->addAddress($emailto);              // Name is optional
	
    
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $message;
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    $mail->AddAttachment($path, 'archive.tar.gz');
    return $mail->send();
   
} 
catch (Exception $e) {
    return 0;
}
}

?>
