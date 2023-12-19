<?php

$is_invalid = false;

    if($_SERVER["REQUEST_METHOD"] === "POST"){
    
    $mysqli = require __DIR__. "/database.php";

    $sql = sprintf("SELECT * FROM user
                    WHERE email = '%s'",
                    $mysqli-> real_escape_string($_POST["email"]));
    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();
    
    if($user){
        if(password_verify($_POST["password"],$user["password_hash"])){
            die("LOGIN SUCCESSFUL");

            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];

            header("location: index.php");
            exit;
        }
    }
    $is_invalid = true;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="loginedit.css">
    <script src="script.js"></script>
    <title>WEBPAGE2</title>
</head>
<body>

    <div class="signupnow">
      <h1>SIGN IN</h1>

      <?php if($is_invalid): ?>
        <em>Invalid login</em>
     <?php endif; ?>

    </div>
    <div class="container">
        <label for="email"><b>Email</b></label>
        <input type="email" placeholder="Enter email" name="email" required
                value="<?= htmlspecialchars($_POST["email"] ??"") ?>">
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required>
          
        <button type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label>
      </div>
  
      <div class="container" style="background-color:#f1f1f1; color:rgb(0, 0, 0);">
        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  </div>
    
</body>
</html>
