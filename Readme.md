
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Mario Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        h1, h2 {
            color: #444;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        .section {
            margin-bottom: 30px;
        }
        .notice {
            color: #f00;
            font-weight: bold;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: "Courier New", Courier, monospace;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Web Mario Game</h1>
    <a src="https://web-mario-47dc5.web.app/">Demo Site Here</a>
    <div class="section">
        <h2>Welcome Menu</h2>
        <p>This is the welcome menu of my Mario game. There are four clickable buttons:</p>
        <ul>
            <li>One button enters the game.</li>
            <li>One button lets you choose the level.</li>
            <li>The bottom left button opens a login form where users can log in.</li>
        </ul>
        <img src="https://i.imgur.com/6yiId9s.png" alt="Welcome Menu">
    </div>

    <div class="section">
        <h2>Login Form</h2>
        <p>If you are already logged in, the form will be replaced by some text.</p>
        <img src="https://i.imgur.com/KvMJuSq.png" alt="Login Form">
        <img src="https://i.imgur.com/Mc8PmgW.png" alt="Logged in">
    </div>

    <div class="section">
        <h2>Level Selection</h2>
        <p>The level button opens up a popup that allows you to choose the level you want to play.</p>
        <img src="https://i.imgur.com/jMfUifx.png" alt="Level Selection">
    </div>

    <div class="section">
        <h2>Settings</h2>
        <p>The gear icon on the bottom right side lets you adjust the volume of BGM and effects respectively.</p>
        <img src="https://i.imgur.com/rhAlpC2.png" alt="Settings">
    </div>

    <div class="section">
        <h2>In-Game Controls</h2>
        <p>You can adjust the volume of the BGM and the effects during the game.</p>
        <p>Also, you have the ability to pause the game:</p>
        <ul>
            <li>Use <code>W</code> and <code>S</code> keys to maneuver the arrow.</li>
            <li>Press <code>Enter</code> to make a choice.</li>
            <li><code>A</code> and <code>D</code> are for moving left and right, while <code>Space</code> is for jumping.</li>
        </ul>
        <img src="https://i.imgur.com/nu9ShD6.png" alt="Pause Menu">
    </div>

    <div class="section">
        <h2>Game Features</h2>
        <p>The game can be played with or without user login. If you log in, the remaining lives and total amount of gold will be recorded into the database. The number of coins will always reset if your life count hits zero.</p>
    </div>

    <div class="section">
        <h2>Level 1</h2>
        <p>Level 1 is a basic level inspired by the original Level 1 of the Mario Bros game.</p>
        <p>There are two different enemies: the Piranha Flower and the Turtle. There are two kinds of Piranha Flowers:</p>
        <ul>
            <li>Some will already be risen and stand in the middle of the road.</li>
            <li>Others rise from the tubes.</li>
        </ul>
        <p>The turtles can be killed when contacted from above. After that, the player can send the turtle shell flying with another touch and stop it when contacted from above.</p>
        <p class="notice">If you encounter an enemy and get attacked, you will be bounced back a certain distance. <br><strong>HOWEVER, YOU DON'T HAVE IMMUNITY during this period of time.</strong></p>
        <p>I designed some enemies to trigger each other when you touch one of the two. The question box has a 90% chance to generate a coin and a 10% chance to generate a mushroom. The coin will automatically be collected as it appears after you bump the box and then disappears.</p>
        <img src="https://i.imgur.com/Pbz9ONC.png" alt="Level 1">
    </div>

    <div class="section">
        <h2>Level 2</h2>
        <p>Level 2 is constructed with falling blocks. You can jump on the blocks once. After contact, the block will fall and then disappear.</p>
        <p>There are Piranha Flowers and Turtles to stop you.</p>
        <p class="notice">There is a great chance that you will be launched to death if you touch either one of the multiple enemies.</p>
        <img src="https://i.imgur.com/vIaiMZb.png" alt="Level 2">
    </div>

    <div class="section">
        <h2>Sound Effects</h2>
        <p>The Main Menu, Level 1, and Level 2 have different background music (BGM). There are also sound effects for various actions:</p>
        <ul>
            <li>Jumping</li>
            <li>Coin collection</li>
            <li>Powerup appearance from the question box</li>
            <li>Eating a powerup</li>
            <li>Death</li>
            <li>Game over</li>
        </ul>
        <p>There might be more effects that I forgot to mention.</p>
    </div>

    <div class="section">
        <h2>Special Ability: Air Jump</h2>
        <p>There is a special ability called "Air Jump" that Mario has. If Mario is coming off a higher platform than the floor, and he did not jump off the platform, he can perform an air jump mid-air. This will make the second level much easier to get through.</p>
    </div>

    <div class="section">
        <h2>Need Help?</h2>
        <p>If you have any questions while playing the game, I would be happy to answer any questions about the game.</p>
    </div>
</div>

</body>
</html>
