/* General Config */


/* User Permits */
PERMITS = {
    SuperUser: [
        /* /user */
        {
            method: `POST`,
            url: `/user`
        }, {
            method: `GET`,
            url: `/user`
        }, {
            method: `PUT`,
            url: `/user`
        }, {
            method: `DELETE`,
            url: `/user`
        },
        /* /film */
        {
            method: `POST`,
            url: `/film`
        }, {
            method: `GET`,
            url: `/film`
        }, {
            method: `PUT`,
            url: `/film`
        }, {
            method: `DELETE`,
            url: `/film`
        },
        /* /viewed */
        {
            method: `POST`,
            url: `/viewed`
        }, {
            method: `GET`,
            url: `/viewed`
        }, {
            method: `PUT`,
            url: `/viewed`
        }, {
            method: `DELETE`,
            url: `/viewed`
        }
    ],
    Administrator: [
        /* /film */
        {
            method: `POST`,
            url: `/film`
        }, {
            method: `GET`,
            url: `/film`
        }, {
            method: `PUT`,
            url: `/film`
        }, {
            method: `DELETE`,
            url: `/film`
        },
        /* /viewed */
        {
            method: `POST`,
            url: `/viewed`
        }, {
            method: `GET`,
            url: `/viewed`
        }, {
            method: `PUT`,
            url: `/viewed`
        }, {
            method: `DELETE`,
            url: `/viewed`
        }
    ],
    Common: [ 
        /* /film */ 
        {
            method: `GET`,
            url: `/film`
        },
        /* /viewed */
        {
            method: `GET`,
            url: `/viewed`
        }
    ]
};


module.exports = {
    DATABASE: `mongodb://127.0.0.1/IgnoDB`,
    ENCODE_CONSTANT: 24,
    EXCLUDED_URLS: [`/signIn`, `/signUp`, `/password_reset`, `/password_reset_done`],
    PASSWORD_SALT: 12,
    PERMITS,
    SECRET_TOKEN: `TokenOfIgnoDb1224`,
    SERVER_PORT: process.env.PORT || 1224,
    SERVER_URL: `http://localhost`
}

