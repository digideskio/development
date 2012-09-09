<?php
ini_set("default_charset","UTF-8");
header('Content-type: text/html; charset=UTF-8');
$fn = "mots.txt";
if (isset($_POST['content']))
{
    $content = stripslashes($_POST['content']);
    $fp = fopen($fn,"w") or die ("Error opening file in write mode!");
    fputs($fp,$content);
    fclose($fp) or die ("Error closing file!");
}
?>



<form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="post">
    <textarea rows="25" cols="40" name="content"><?php readfile($fn); ?></textarea>
    <input type="submit" value="Save">
</form>