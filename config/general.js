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
    SERVER_PORT: process.env.PORT || 1224,
    DATA_BASE: `mongodb://127.0.0.1/IgnoDB`,
    SECRET_TOKEN: `TokenOfIgnoDb1224`,
    EXCLUDED_URLS: [`/signIn`, `/signUp`],
    PERMITS,
    PASSWORD_SALT: 12,
    ENCODE_CONSTANT: 24
}

