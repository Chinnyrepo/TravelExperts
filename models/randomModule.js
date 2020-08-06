/*Function to generate random characters of a certain length
 *Adam Zukowski*/
exports.getRandomString = function(length) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result= '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

/*Function to generate random greetings
 *Edwin GonoSantosa*/
let greetingArray = ['Welcome', 'Bienvenue', 'Welkom','Willkommen','Ahlan Wa Sahlan',
'Mabuhay','Salamat Datang','Tervetuloa','Salve','Benvenuto'];

exports.randomGreeting = function(){
    //Generate random integer between 0 and 9
    let index = Math.floor( Math.random() * 10);

    return greetingArray[index];
}