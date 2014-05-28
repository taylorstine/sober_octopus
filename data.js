var provider = require('./spark_provider')();
var users = [];

var imageUrls = [
  "http://media-cache-ak0.pinimg.com/736x/54/8f/1f/548f1f70c14339e43a75e6c8a2e44371.jpg",
  "http://media-cache-ec0.pinimg.com/736x/2e/cd/3e/2ecd3eec989577597aa4a2b37c872a62.jpg",
  "http://media-cache-cd0.pinimg.com/736x/02/e0/33/02e0333dc53003edd269e2538a666e5d.jpg",
  "http://media-cache-ec0.pinimg.com/736x/22/e6/6e/22e66e1cf8d778d6e568b7a103dd0115.jpg",
  "http://media-cache-ak0.pinimg.com/736x/8e/27/a3/8e27a37677dd73b182c4c9597d20ea57.jpg",
  "http://media-cache-ak0.pinimg.com/736x/25/ce/51/25ce51bf89b3ac9b8453f2440747e4f4.jpg",
  "http://media-cache-ak0.pinimg.com/736x/6d/22/1c/6d221c871c1260158d5049091aca2f09.jpg",
  "http://media-cache-ak0.pinimg.com/736x/2d/50/2a/2d502ab5f6c6167d99a079f9a8ef4474.jpg",
  "http://media-cache-ak0.pinimg.com/736x/01/5c/ff/015cff3ff8b0aad92d3b2e37d6c7dd69.jpg",
  "http://media-cache-ec0.pinimg.com/736x/dc/bd/9c/dcbd9cd45902ddd43b7415865d5f461b.jpg",
  'http://media-cache-ak0.pinimg.com/736x/74/07/47/7407472bd7fcbd3c510d1bdb2fb5fa18.jpg',
  'http://media-cache-ak0.pinimg.com/736x/fd/60/c9/fd60c93a91c2860d94c6be8ead2e5172.jpg',
  'http://media-cache-ec0.pinimg.com/736x/60/42/56/6042561412bd9d94d0dfb6c680006716.jpg',
  'http://media-cache-ec0.pinimg.com/736x/12/40/02/1240025eff65d58ce5c67690f3c9ebf3.jpg',
  'http://media-cache-ak0.pinimg.com/736x/9f/8b/0a/9f8b0aeac113dedfe37cf81dd23c6766.jpg',
  'http://media-cache-ec0.pinimg.com/736x/37/67/c5/3767c5f0a3762b2ac1397003b8ee98f6.jpg',
  'http://media-cache-ak0.pinimg.com/736x/37/7f/a0/377fa0e37984c86c857c30945bfef243.jpg',
  'http://media-cache-ak0.pinimg.com/736x/b5/a2/aa/b5a2aa5e589a6327641164cc4b6880ba.jpg',
  'http://media-cache-ec0.pinimg.com/736x/e3/49/9d/e3499de57beb6cbaf7da9c669c3d4369.jpg',
  'http://media-cache-ec0.pinimg.com/736x/81/4e/ad/814eada5b921417cb91749dc9dcba48f.jpg',
];

var holding_colors = [
  "0x353942",
  "0x583728",
  '0x505B77',
  '0x898797',
  '0x7F5452',
  '0xF55243',
  '0x888888',
  '0x6F6048',
  '0x383839',
  '0xBD8A6F',
  '0xE8CEA8',
  '0x141311',
  '0x71212E',
  '0x828385',
  '0x209DCE',
  '0x936251',
  '0x856F97',
  '0x6F8A75',
  '0x476799',
  '0x724834'
];

var sizes = [
  {
    width:'736',
    height:'1361'
  },
  
  {
    width:'359',
    height: '539'
  },
    
  {
    width: '500',
    height: '641'
  },

  {
    width:'554',
    height:'1039'
  },

  {
    width:'500',
    height:'482'
  },

  {
    width:'703',
    height:'938'
  },

  {
    width:'500',
    height:'716'
  },

  {
    width: '500',
    height: '624'
  },

  {
    width: '550',
    height: '550'
  },
  
  {
    width: '253',
    height: '379'
  },

  {
    width: '736',
    height: '1104'
  },

  {
    width: '500',
    height: '645'
  },

  {
    width: '736',
    height: '736'
  },
  
  {
    width: '350',
    height: '537'
  },

  {
    width: '600',
    height: '983'
  },

  {
    width: '736',
    height: '489'
  },

  {
    width: '351',
    height: '409'
  },

  {
    width: '600',
    height: '866'
  },

  {
    width: '500',
    height: '750'
  },

  {
    width: '290',
    height: '370'
  }
];

var titles = [
  'Lorem Ipsum',
  'Dolor sit Amet',
  'Consectetuer Adipiscing Elit',
  'Sed Diam Nonummy',
  'Nibh Euismod',
  'Tincidunt ut Laoreet',
  'Dolore magna Aliquam',
  'Erat Volutpat',
  'Ut Wisi Enim ad Minim Veniam',
  'Quis Nostrud Exerci Tation',
  'Ullamcorper Suscipit'
];

var descriptions = [
  'dolor sit amet, consectetur adipiscing elit. Sed pretium malesuada aliquam. Nam tincidunt non quam eu adipiscing. Vivamus cursus ligula sit amet blandit tincidunt. Duis fringilla diam et tempor aliquet. Phasellus nisl nibh, ornare at faucibus id, ornare in neque. Proin at risus commodo, blandit nibh quis, bibendum dui. Mauris in ligula turpis. Sed dui quam, mattis ut varius vel, congue nec enim.',
  
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper, nulla sit amet malesuada euismod, eros urna feugiat odio, eu elementum tortor nulla nec turpis. Aliquam mauris magna, bibendum non ullamcorper quis, vehicula ac nisl. Cras fermentum lectus vitae dui congue, sit amet accumsan ante vestibulum. Nullam quis massa magna. Nulla ultricies nisl eget dolor vehicula fermentum. Nam vel volutpat dolor, in sodales lacus. Donec quis diam sed purus euismod egestas.',
  
  'Pellentesque est ligula, vehicula ac sagittis ut, mollis sed turpis. Donec quis leo non ipsum sollicitudin volutpat. Ut mollis, mi eget fringilla consectetur, urna elit commodo mi, eget pellentesque nunc erat quis massa. Nullam malesuada lacus quis imperdiet iaculis.',

  'Proin tincidunt enim ut felis tempus, ac imperdiet nibh porttitor. Morbi pellentesque iaculis sodales. Vestibulum enim dui, lobortis vitae mattis porta, aliquam at neque. In nec condimentum leo.',

  'Suspendisse accumsan purus felis, eu convallis erat lobortis sed. Curabitur in urna tortor. Integer ut rhoncus sapien. Vestibulum dapibus lorem ut libero sollicitudin mattis. Vivamus et felis eu lorem tincidunt semper at in diam. Donec neque ipsum, accumsan et eros in, molestie interdum mi. Aliquam a convallis elit, vitae posuere urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ut sapien id massa suscipit iaculis eu nec quam. In ultrices venenatis rutrum. Quisque nec porta risus.',

  'In in nunc eget erat euismod pretium sit amet eu turpis. Vestibulum consectetur ipsum ac consequat tristique. Integer auctor metus non ante pretium, vel pretium quam consectetur. Suspendisse sed lorem purus. Praesent orci ipsum, euismod ac laoreet sed, iaculis vel nibh. Cras et porta risus, et rhoncus velit. Morbi hendrerit vitae libero quis dignissim.',

  'Nulla ultricies nisl eget dolor vehicula fermentum. Nam vel volutpat dolor, in sodales lacus.',
  
];

var userNames = [
  'sup3rman1928',
  'thedarkNIGHT918',
  'tony.Stark3111',
  'peter_parker652',
  'th3_joker192',
  'wul_verine421',
  'incredible_HULK1573',
  'captain_USA_1776'
];

var profile_pics = [
  'http://media-cache-ec0.pinimg.com/736x/0f/98/1f/0f981fea934e11a5123b0a8c11217dce.jpg',
  'http://media-cache-cd0.pinimg.com/736x/fc/84/ce/fc84ced1835208f5f2b78e5307780426.jpg',
  'http://media-cache-ak0.pinimg.com/736x/7c/ec/b3/7cecb3f4c3a66cdacab06cd069f4d8d5.jpg',
  'http://media-cache-ec0.pinimg.com/736x/52/c0/5a/52c05a1d7c41fe9da124a2cae7d122a9.jpg',
  'http://media-cache-ak0.pinimg.com/736x/47/6d/2d/476d2d0df53eda4658a12d40aca9cfb0.jpg',
  'http://media-cache-ak0.pinimg.com/736x/ca/0e/4e/ca0e4e3db762b546d3866ea5fb3df664.jpg',
  'http://media-cache-ak0.pinimg.com/736x/42/59/b4/4259b466940848951cc028111ce1e8b7.jpg',
  'http://media-cache-ec0.pinimg.com/736x/bf/ad/08/bfad082d80a377c387405208e53a2d05.jpg'
];

var comments = [
  'Great! so awesome',
  'I have so many of these',
  'Their the best ever',
  "It's ok nothing too great",
  'It gets the job done',
  "I am in love with this product",
  "Ugh, terrible",
  "I think everyone I know would like this",
  "Nope, I won't buy this"
];

var categories = [
  'shoes',
  'art',
  'shirts',
  'pants',
  'shorts',
  'watches',
  'accessories',
  'food',
];


function getRandom(high){
  return Math.floor(Math.random() * high);
}

function getRandomArrayValue(arr){
  return arr[getRandom(arr.length)];
}

function getTitle(){
  return getRandomArrayValue(titles);
}

function getDescription(){
  return getRandomArrayValue(descriptions);
}

function getCommentCount(){
  var maxCommentCount = 10;
  return getRandom(maxCommentCount);
}

function getLikeCount(){
  var maxLikeCount = 50;
  return getRandom(maxLikeCount);
}

function getComments(count){
  var comments = [];
  for(var idx=0; idx < count; idx+=1){
    comments.push(generateComment());
  }
  return comments;
}

function generateComment(){
  return new Comment(getRandomUser(),
                     getRandomArrayValue(comments));
                     
}

function getRandomUser(){
  if (users.length === 0){
    throw "Generate users first";
  }
  return getRandomArrayValue(users);
}


function generateUsers(){
  var userCount = userNames.length;
  for (var idx = 0; idx < userCount; idx+=1){
    var userId = generateUserId();
    users.push( new User(userId, userNames[idx], profile_pics[idx], '/users/'+userId));
  }
  return users;
}

var generateUserId = function(){
  var userId = 0;
  return function(){
    userId +=1;
    return userId;
  };
}();

function getImage(){
  var imgIdx = getRandom(imageUrls.length);
  return new Image(imageUrls[imgIdx], holding_colors[imgIdx], sizes[imgIdx]);
}

function getPrice(){
  var maxCost = 100;
  return getRandom(maxCost);
}

function getCategory(){
  return getRandomArrayValue(categories);
}

function generateProduct(){
  var title = getTitle();
  var description = getDescription();
  var comment_count = getCommentCount();
  var like_count = getLikeCount();
  var comments = getComments(comment_count);
  var image = getImage();

  var price = getPrice();
  var category = getCategory();
  var variations = {};

  return new Product(title, description, variations, comment_count, like_count, comments, category, price, image);
}

var Image = function(url, holding_color, size){
  this.size = {
    width: size.width,
    height: size.height
  };
  this.url = url;
  this.holding_color = holding_color;
};

var Product = function(title, description, variations, comment_count, like_count, comments, category, price, image){
  this.image= image;
  this.title = title;
  this.description = description;
  this.variations = variations;
  this.comment_count = comment_count;
  this.like_count = like_count;
  this.comments = comments;
  this.forms = {
    add_comment: {},
    like:{}
  };
  this.category = category;
  this.price = price;
};

var Variation = function(){
  this.description= description,
  this.price= price,
  this.forms ={
    add_to_cart:{},
  };
};

var Comment = function(user, comment){
  this.user = user;
  this.date = new Date();
  this.comment = comment
};

var User = function(user_id, username, href, image){
  this.user_id = user_id;
  this.username = username;
  this.image = image;
  this.href = href;
};

function saveProducts(products){
  provider.save(products);
};

function printProducts(){
  provider.getAll(function(err, items){
    console.log(JSON.stringify(items, {}, ' '));
  });
};

function generateData(){
  var numProducts = 3;
  var products = [];
  generateUsers();
  for (var idx = 0; idx < numProducts; idx+=1){
    products.push(generateProduct());
  }
  console.log("made products");
  saveProducts(products);
  console.log("saved products");
}

//generateData();
printProducts();
