const mongoose  = require('mongoose'),
      Post      = require('./models/post');

let data = [
    {
        title: "What is Lorem Ipsum?",
        image: "https://diversity.appstate.edu/saywhat/_images/saywhat-2-1000.png",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        title: "Why do we use it?",
        image: "https://ericasuter.com/wp-content/uploads/2018/02/why-buy-antivirus.jpg",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        title: "Where does it come from?",
        image: "https://msg91.com/blog/wp-content/uploads/2013/05/what-where-how.png",
        body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
    }
];

// Creating a sample post in DB
function seedDB() {
    // Remove all posts in DB
    Post.deleteMany({}, (err) => {
        if (err) console.log(err);
        else {
            console.log('Removed all posts!');
            // Add few fresh posts in DB
            Post.create(data, (err, post) => {
                if (err) console.log(err);
                else console.log('Added posts');
            });
        }
    });
}

module.exports = seedDB;