var twitter = require('twitter');

var client = new twitter({
    consumer_key:'RDzDtfkXdbsQpgB7ILG8pBuvz',
    consumer_secret:'nGfALzQChu5kP47SIeMiCAzSWsg7bPuBj3y68A19v8CeBuXEj3',
    access_token_key:    '264055015-58JIdX2eXJHLMmWFfKREP1cr0SaelEEmjJtCFerO',
    access_token_secret: 'oylpY7ypPwiHJJKl7QpHUuUUgT9ypgnouZn54dI29gLNP',
});

var params = {screen_name: 'hayato_razona'};

client.get('users/show', params, function(error, tweets, response){
    if (!error) {
        console.log(tweets);
    }
});
