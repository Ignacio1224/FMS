/* Mail Configs */

/* Nodemailer transporter */
const transporter = {
    service: 'gmail',
    auth: {
        user: 'condeplayero@gmail.com',
        pass: 'terror24'
    }
}


/* HTML Templates */
function resetPasswordRequestTemlate(username, url) {    
    const template = `
        <html>
            <head>
                <style>
                * [title="anchor"] {
                    text-decoration: none;
                    padding: 0.4em;
                    background-color: #00A6FF;
                    color: #FFFFFF;
                    border-radius: 4px;
                }

                * [title="anchor"]:hover {
                    background-color: #0088FF;
                    color: #EEEEEE;
                }
                
                .anchor {
                    text-decoration: none;
                    padding: 0.4em;
                    background-color: #00A6FF;
                    color: #FFFFFF;
                    border-radius: 4px;
                }

                .anchor:hover {
                    background-color: #0088FF;
                    color: #EEEEEE;
                }
                </style>
            </head>
            <body>
                <h2>Hello ${username}!</h2> 
                <p>You have requested the password change for your account.</p>
                <p>To continue with the process you must press the following 
                <a class="anchor" title="anchor" href="${url}" target="_blank">Button</a></p>  
                <p style="margin-top:2em; color: #EE2222;">Carefulness!</p>
                <p>The following rules for the creation of the new password are:</p>
                <ul style="list-style-position: inside;">
                <li>Must contain at least 8 characters.</li>
                <li>Must contain at least 1 number.</li>
                <li>Must contain at least 1 sybol like: '$', '@', '%', '#', etcetera.</li>
                </ul>
                <div style="color: #AE00FF">
                <p>
                    Sincereley,
                </p>
                <p style="margin-left: 2em;">
                    The IgnoDB team.
                </p>
                </div>
            </body>
        </html>
        `
    ;

    return template;
}



module.exports = {
    resetPasswordRequestTemlate,
    transporter
}
