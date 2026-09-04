$(document).ready(function() {

    // Character sets
    const uppercase =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercase =
        "abcdefghijklmnopqrstuvwxyz";

    const numbers =
        "0123456789";

    const symbols =
        "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Generate password
    function generatePassword() {

        let length = parseInt($("#length").val());

        let characters = "";

        if ($("#uppercase").is(":checked")) {
            characters += uppercase;
        }

        if ($("#lowercase").is(":checked")) {
            characters += lowercase;
        }

        if ($("#numbers").is(":checked")) {
            characters += numbers;
        }

        if ($("#symbols").is(":checked")) {
            characters += symbols;
        }

        // Prevent empty selection
        if (characters.length === 0) {

            $("#password")
                .val("Select an option");

            return;
        }

        let password = "";

        for (let i = 0; i < length; i++) {

            let random =
                Math.floor(
                    Math.random() * characters.length
                );

            password += characters[random];
        }

        // Password animation
        $("#password")
            .css({
                opacity: 0,
                transform: "translateX(-10px)"
            })
            .val(password)
            .animate({
                opacity: 1
            }, 300);

        updateStrength();

    }


    // Update length
    $("#length").on("input", function() {

        $("#lengthValue")
            .text($(this).val());

        generatePassword();

    });


    // Generate button
    $("#generateBtn").click(function() {

        const button = $(this);

        button.css(
            "transform",
            "scale(0.94)"
        );

        setTimeout(function() {

            button.css(
                "transform",
                "scale(1)"
            );

        }, 120);

        generatePassword();

    });


    // Checkbox changes
    $(".option input").change(function() {

        $(this)
            .parent()
            .addClass("option-active");

        setTimeout(function() {

            $(".option")
                .removeClass("option-active");

        }, 300);

        generatePassword();

    });


    // Copy password
    $("#copyBtn").click(function() {

        const password =
            $("#password").val();

        if (!password ||
            password === "Select an option" ||
            password === "Click Generate"
        ) {
            return;
        }

        navigator.clipboard.writeText(password);

        $("#copyMessage")
            .stop(true, true)
            .fadeIn(200)
            .delay(1200)
            .fadeOut(500);

        // Copy button animation
        $(this)
            .text("✓")
            .css("background", "#166534");

        setTimeout(() => {

            $("#copyBtn")
                .text("📋")
                .css("background", "#0f172a");

        }, 1200);

    });


    // Password strength
    function updateStrength() {

        let score = 0;

        let password =
            $("#password").val();

        let length =
            password.length;

        if (length >= 8)
            score++;

        if (length >= 12)
            score++;

        if (length >= 16)
            score++;

        if (
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password)
        ) {
            score++;
        }

        if (/[0-9]/.test(password))
            score++;

        if (/[^A-Za-z0-9]/.test(password))
            score++;


        let width = 25;
        let text = "Weak";

        if (score >= 3) {
            width = 55;
            text = "Medium";
        }

        if (score >= 5) {
            width = 80;
            text = "Strong";
        }

        if (score >= 6) {
            width = 100;
            text = "Very Strong";
        }


        $("#strengthFill")
            .css("width", width + "%");

        $("#strengthText")
            .text(text);

    }


    // Initial password
    generatePassword();

});