<?php
$target_dir = "file/uploads/";
date_default_timezone_set('Asia/Ho_Chi_Minh');
$time = date("Y-m-d H:i:s");
$total = count($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;

// $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
// if(isset($_POST["submit"])) {
//     $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
//     if($check !== false) {
//         echo "File is an image - " . $check["mime"] . ".";
//         $uploadOk = 1;
//     } else {
//         echo "File is not an image.";
//         $uploadOk = 0;
//     }
// }
// Check if file already exists
// if (file_exists($target_file)) {
//     echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }
//Check file size
// if ($_FILES["fileToUpload"]["size"] > 5242880) {
//     echo "Sorry, your file is too large.";
//     $uploadOk = 0;
// }
// Allow certain file formats
// if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
// && $imageFileType != "gif" ) {
//     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//     $uploadOk = 0;
// }
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    for($i=0; $i<$total; $i++){
        
        //rename file when upload
        $filename = $_FILES["fileToUpload"]["name"][$i];
        //remove extension
        $info = pathinfo($filename);
        $name_no_ext = $info['filename'];

        $file_ext = substr($filename, strripos($filename, '.'));
        $newtime = $_POST["time"];
        $value = $_POST["auth"].$newtime;
        $newfilename = md5($value) . $file_ext;

        $tmpFilepath = $_FILES["fileToUpload"]["tmp_name"][$i];
        if($tmpFilepath != "")
        {
            $newFilePath = $target_dir . $name_no_ext;
            if(move_uploaded_file($tmpFilepath, $newFilePath . "-" . $newfilename));
        }
    }
}
?>