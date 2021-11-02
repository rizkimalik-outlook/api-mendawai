import { facebook,instagram, twitter } from '../controller/hooks/index.js'
import { menu } from '../controller/menu_controller.js'
import * as auth from '../controller/auth_controller.js'
import * as user from '../controller/users_controller.js'

function routes(app) {
    app.route('/').get(function (req, res) {
        res.send(`Application Mendawai API running DB : ${process.env.DB_DATABASE}`);
        res.end();
    });

    app.prefix('/auth', function (api) {
        api.route('/login').post(auth.login);
        api.route('/logout').post(auth.logout);
    });

    app.prefix('/menu', function (api) {
        api.route('/').get(menu);
    });

    app.prefix('/user', function (api) {
        api.route('/').get(user.index);
        api.route('/show/:id').get(user.show);
        api.route('/store').post(user.store);
        api.route('/update').put(user.update);
        api.route('/delete/:id').delete(user.destroy);
    });

    app.prefix('/webhook', function (api) {
        api.route('/facebook/token').post(facebook.facebook_token);
        api.route('/facebook/messenger').post(facebook.facebook_messenger);
        api.route('/facebook/feed').post(facebook.facebook_feed);
        api.route('/facebook/mention').post(facebook.facebook_mention);
    });

    app.prefix('/webhook', function (api) {
        api.route('/instagram/token').post(instagram.instagram_token);
        api.route('/instagram/feed').post(instagram.instagram_feed);
    });
    
    app.prefix('/webhook', function (api) {
        api.route('/twitter/token').post(twitter.twitter_token);
        api.route('/twitter/directmessage').post(twitter.twitter_directmessage);
        api.route('/twitter/mention').post(twitter.twitter_mention);
    });

}

export default routes;
