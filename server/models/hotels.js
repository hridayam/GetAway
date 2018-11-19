const mongoose  = require ('mongoose');
const fs = require('fs');

const cities = require('./usaCities.json');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: Number
    },
    price: {
        queen: Number,
        king: Number,
        twin: Number,
        extra_bed:Number
    },
    stars: {
        type: Number,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    descriptions: [
        {
            type: String,
            required: true
        }
    ],
    amenity: {
        wifi: {
            type: Boolean,
            required: true, 
            default: false
        },     
        gym: {
            type: Boolean,
            required: true,
            default: false
        }, 
        pool: {
            type: Boolean,
            required: true,
            default: false
        }, 
        complimentary_breakfast: {
            type: Boolean,
            required: true,
            default: false
        }, 
        coffee: {
            type: Boolean,
            required: true,
            default: false
        }, 
        laundry: {
            type: Boolean,
            required: true,
            default: false
        }, 
        free_parking: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    room_images: {
        king: String,
        queen: String,
        twin: String
    }
});


const Hotel = module.exports = mongoose.model('Hotel', hotelSchema);

// create a user function
// user will be created if the bcrypt.genSalt and bcrypt.hash functions are successful
module.exports.createHotels = function(newHotel, callBack) {
    //let cities = fs.readFile('usaCities.js', 'utf8');
    const maxNum = cities.length;
    //const num = Math.floor(Math.random() * 11) * maxNum / 10;
    let hotelsList = []
    for (let i = 0; i < maxNum; i++) {
        console.log(i);
        
        for (let j = 0; j < 10; j++) {
        
            let ranHotels = Math.floor((Math.random() * 20))
            
            let ranDes = Math.floor((Math.random() * 20))
            
            let hotelAddress = {
                ...cities[i],
                streetName: addresses[Math.floor((Math.random() * 20))],
                zipcode: Math.floor((Math.random() * 90000) + 10000) 
            };
            
            let amenities = {
                wifi: boolean[Math.floor(Math.random() * 2)],     
                gym: boolean[Math.floor(Math.random() * 2)], 
                pool: boolean[Math.floor(Math.random() * 2)],
                complimentary_breakfast: boolean[Math.floor(Math.random() * 2)],
                coffee: boolean[Math.floor(Math.random() * 2)],
                laundry: boolean[Math.floor(Math.random() * 2)],
                free_parking: boolean[Math.floor(Math.random() * 2)],
            }

            let room_images = {
                king: king[Math.floor((Math.random() * king.length))],
                queen: queen[Math.floor(Math.random()*queen.length)],
                twin: twin[Math.floor(Math.random()*twin.length)]
            }
            
            let hotel = new Hotel({ ...hotels[ranHotels], address: hotelAddress, ...descriptions[ranDes], amenities, room_images});
            //console.log(hotel)
            //hotel.save()
            
            hotelsList.push(hotel);
        }
    }
    //console.log(hotelsList);
    Hotel.insertMany(hotelsList, callBack)
}

/*  //let zipcode = Math.random(10000, 100000);
    let numOfRooms = Math.floor((Math.random() * 11) + 20);
    
    let rooms = [];
    
    // let zipcode = Math.floor((Math.random() * 90000) + 10000);

    for (let r = 1; r <= numOfRooms; r++) {
        let bedTypes = Math.floor((Math.random() * 3));;
        
        
        let room = { "room_number": r }

        const numOfBeds =  Math.floor((Math.random() * 3) + 1);
        
        if (bedTypes == 0){
            room = {
                ...room, 
                "bed_type": "queen",
                "beds": numOfBeds,
                "images": queen[Math.floor(Math.random()*(queen.length + 1))]
            };
        }
        else if (bedTypes == 1){
            room = {
                ...room, 
                "bed_type": "king",
                "beds": numOfBeds,
                "images": king[Math.floor(Math.random()*(king.length + 1))]
            };
            // room.push({"bed_type": "king",
            //             "beds": 1,
            //             "images": king[Math.floor(Math.random()*king.length)]});
        }
        else if (bedTypes == 2){
            room = {
                ...room, 
                "bed_type": "twin",
                "beds": numOfBeds,
                "images": twin[Math.floor(Math.random()*twin.length)]
            };
            // rooms.push({"bed_type": "twin",
            //             "beds": 1,
            //             "images": twin[Math.floor(Math.random()*twin.length)]});
        }

        rooms.push(room);
    }
*/

// get the user with an id
module.exports.getHotelById = function(id, callback) {
    Hotel.findById(id, callback);
}

const boolean = [true, false];

const descriptions = [

    "On entering our gorgeous hotel, you will immediately sense its special atmosphere that makes you feel like being at home. Our spacious and comfortable bedrooms will give you the relaxation you deserve. Come and enjoy your stay",
     
    "Our beautiful and spacious bedrooms provide our guest with the comfort they need. We count with broad varieties of food for our diverse customers traveling from all around the world. Visit our hotel to enjoy of a great vacation and to get the break you need",
     
    "Beautiful hotel with wonderful views. Our focus is to provide our customers with the service they deserve. We count with more than 200 hundred bedrooms to provide our customers with a broad list of options. We make sure you feel like being at home",
    
    "Wonderful hotel provides ultimate comfort and luxury. This 5-star hotel is a beautiful combination of traditional grandeur and modern facilities. Every exclusive guest room is furnished with a range of modern a range of modern amenities",
    
    "Our hotel has a quiet and comfortable environment that provides our guest with a relaxing environment.  It is located close to many popular restaurants in the area ideal to try the best tastes of our country",
    
    "Beautiful hotel offers our guest a unique hospitality experience, based on individual attention and value for their money. It’s beautiful country setting makes every morning a bird watching experience. Enjoy tranquility and nature while being in a safe, private and comfort environment",
    
    "Our gorgeous hotel focuses to offer our guest with extraordinary experiences. Our clean and clean and modern environment is our guest’s favorites. The hotel counts with excellent breakfast, lunch and dinner brunch to all guest at any time. Our focus is to deliver great service and individual attention.",
    
    "Our hotel is set in the heart of the city, a few steps away from a broad variety of restaurants, bars and nightclubs. Located to many area highways, providing instant and easy access to a number of area attraction. This comfortable hotel offers a convenient location, ideal whether in town for business or for pleasure.",
    
    "Modern hotel offers our guest a great experience and a comfortable environment. All of our rooms count with free WiFi and air conditioning. The hotel serves a buffet breakfast daily and room service is also available. Our facilities include dry cleaning and a ticket booking service.",
    
    "Our luxury hotel offers 120 comfortably furnished guest rooms.  All rooms have cable TV and wireless internet access. International direct-dial phone and safe are also available. Our hotel is set in the heart of the city. It is 2 minutes away from popular bars and restaurants.",
    
    "Come enjoy a stay at our hotel and sink your teeth into a luxurious experience. Our Buffet is highly rated and our staff is very friendly. Enjoy our fast Wi-Fi and great room service to make your stay that much better.",
    
    "See the city like you’ve never seen it before! We have one-of-a-kind views of the area with a top notch selection of wines to choose from. Enjoy our amenities during your stay with us and make the most out of your trip!",
    
    "Rated the Best in Town by various magazines and Hotel of the Year by Time Magazine. Our hotel is more than a place to stay, it is an experience. When you stay with us, the world is yours.",
    
    "The weather in this city cannot be beat and our hotel takes full advantage of that!  When you’re staying with us you’ll feel right at home with our eco-friendly common areas that allow you to experience this beautiful place to the fullest.",
    
    "Beautiful weather, awe-inspiring views, and countless of things to do. In our hotel you have a plethora of experiences to choose from. We guarantee that at the end of the stay, you’ll be asking to stay one more night.",
    
    "The comfort of our hotel cannot be beat. We have a full size pool with a bar right next to it that you can get drinks from to relax by our unbeatable pool. You’ve seen other hotel’s posting about them having the best pool? Well they’re wrong! We have the best pool.",
    
    "Our hotel will blow your mind away. Our 5 star restaurant will make you want to stay here forever, it’s that good! Our restaurant also does room service so you can even eat in the comfort of your own room. GIve us a shot, you won’t regret it!",
    
    "The best customer experience! -The Verge. Our customer service is unbeatable as we strive to do everything we can to make your experience that much better. Once you’ve stayed with us, other hotels will no longer make you feel fulfilled.",
    
    "Extravagant rooms for extravagant guests. Our rooms cannot be beat, when you’re here, you’re royalty and you can literally do anything that you want!** Come stay with us and enjoy the beautiful city and spend time in downtown which is just one block away! **Note: Guests are subject to the rules and regulations for the hotel. Please visit our website to view all rules and regulations.",
    
    "Unbeatable prices for unbeatable views. Our hotel offers guests the best views in the area and we have the best catering service in town. Stay for the view, but enjoy the spa and other amenities offered by our hotel and staff."
    
    ];
    

let addresses = [
    "1600 Pennsylvania Avenue", 
    "11 Wall Street", 
    "350 Fifth Avenue", 
    "221 B Baker St", 
    "4059 Mt Lee Dr. Hollywood", 
    "2 Macquarie Street", 
    "10 Downing Street", 
    "1060 West Addison Street", 
    "263 Prinsengracht", 
    "46 South Leeton Ridge Lane", 
    "7145 Warren Street", 
    "38 S. Marconi St.", 
    "8669 Van Dyke Ave.", 
    "9534 Arnold Ave.", 
    "8196 East Walt Whitman St.", 
    "623 Valley Farms Ave.", 
    "13 Ann Drive", 
    "952 Grand Street",
    "537 E. Garden St.",
    "8916 Wild Rose Ave.",
    "698 Old Pierce Dr.",
]    

let hotels = [
    {
        "name": "Westin St. Francis",
        "stars": 3,
        "price": {
            "queen": 70,
            "king": 75,
            "twin": 65,
            "extra_bed": 10
        },
        "images": [
            "https://s3.amazonaws.com/cancelon.images.cdn/134/094/134094/15/Main_Photo/large/27984606.jpg",
            "https://brokeassstuart-9uzlt3u.netdna-ssl.com/wp-content/pictsnShit/2018/08/3981655734_9d65b87d06_b.jpg"
        ]
    },
    {   
        "name": "Drisco",
        "stars": 3,
        "price": {
            "queen": 80,
            "king": 70,
            "twin": 62,
            "extra_bed": 15
        },
        "images": [
            "https://exp.cdn-hotels.com/hotels/1000000/80000/74200/74183/0e56cbe7_z.jpg",
            "https://images.trvl-media.com/hotels/1000000/80000/74200/74183/3e3b9607_z.jpg",
            "https://exp.cdn-hotels.com/hotels/1000000/80000/74200/74183/b3900d30_z.jpg"
        ]
    },
    {
        "name": "The Ritz-Carlton",
        "stars": 5,
        "price": {
            "queen": 200,
            "king": 255,
            "twin": 95,
            "extra_bed": 40
        },
        "images": [
            "https://s3-media4.fl.yelpcdn.com/bphoto/81SypEklVyRYm2x0y5k_cg/o.jpg",
            "https://robbreportedit.files.wordpress.com/2016/04/24a_presidential-suite_living-room_cam_01_2013-11-27_3141.jpg?w=1024"
        ]
    },
    {
        "name": "The St. Regis",
        "stars": 5,
        "price": {
            "queen": 110,
            "king": 115,
            "twin": 65,
            "extra_bed": 30
        },
        "images": [
            "https://exp.cdn-hotels.com/hotels/12000000/11930000/11927100/11927099/563f168d_z.jpg",
            "http://www.visitsingapore.com/mice/en/plan-your-event/venues/st-regis-singapore/overview/_jcr_content/cardcontent/cardcontentpar/image_video/carousel/item_1.resize.carousel-img.0.0.jpg"
        ]
    },
    {
        "name": "The Orchard",
        "stars": 4,
        "price": {
            "queen": 75,
            "king": 95,
            "twin": 35,
            "extra_bed": 10
        },
        "images": [
            "https://media-cdn.tripadvisor.com/media/photo-s/08/7d/45/a3/the-orchard-hotel.jpg",
            "https://img.grouponcdn.com/getaways/5CFs4gKQ3eq4dLTRQMtev2/564858_42_y-500x290/v1/t550x332.jpg"
        ]
    },
    {

        "name": "Chancellor Hotel",
        "stars": 3,
        "price": {
            "queen": 50,
            "king": 65,
            "twin": 25,
            "extra_bed": 10
        },
        "images": [
            "http://d1060ja7433lis.cloudfront.net/SOF0EfLJbY/jqg_1515268103.jpg",
            "https://s3-media3.fl.yelpcdn.com/bphoto/5CTPBkaHMkvReEZn_MIPkw/ls.jpg"
        ]
    },
    {
        "name": "Mr. C Beverly Hills",
        "stars": 5,
        "price": {
            "queen": 70,
            "king": 75,
            "twin": 65,
            "extra_bed": 10
        },
        "images": [
            "https://images.elitemeetings.com/000223/mr_c_beverly_hills_meetings_a.jpg",
            "https://t-ec.bstatic.com/images/hotel/max1280x900/677/67736193.jpg"
        ]
    },
    {
        "name": "Argonaut Hotel",
        "stars": 4,
        "price": {
            "queen": 70,
            "king": 75,
            "twin": 65,
            "extra_bed": 10
        },
        "images": [
            "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_650,q_auto,w_1000/itemimages/80/19/8019_v10.jpeg",
            "https://s-ec.bstatic.com/images/hotel/max1024x768/115/115989325.jpg"
        ]
    },
    {
        "name": "Petite Auberge",
        "stars": 3,
        "price": {
            "queen": 70,
            "king": 75,
            "twin": 65,
            "extra_bed": 10
        },
        "images": [
            "https://s3-media4.fl.yelpcdn.com/bphoto/_eO4GtaDoyXbiGeJr_6UCQ/o.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/13/69/28/e0/petite-auberge-entrance.jpg"
        ]
    },
    {
        "name": "The Peninsula",
        "stars": 3,
        "price": {
            "queen": 71,
            "king": 76,
            "twin": 67,
            "extra_bed": 11
        },
        "images": [
            "http://cdn01.cdn.justjared.com/wp-content/uploads/2007/09/hudgens-hotel/vanessa-hudgens-beverly-hills-hotel-06.jpg",
            "https://www.californiabeaches.com/wp-content/uploads/2017/07/1418167440-venue-peninsula-bh.jpg",
            "https://www.peninsula.com/en/-/media/beverly-hills/01_dining/2-the-living-room/living-room-new-overview-p.jpg?mw=987&hash=4445F280D9EFE3BC23877D92D5252531609FCAE9"
        ]
    },
    {
        "name": "Huntington Hotel",
        "stars": 4,
        "price": {
            "queen": 80,
            "king": 95,
            "twin": 45,
            "extra_bed": 17
        },
        "images": [
            "https://t-ec.bstatic.com/images/hotel/max1024x768/539/53979157.jpg",
            "https://s-ec.bstatic.com/images/hotel/max1024x768/597/59778051.jpg"
        ]
    },
    {
        "name": "Fairmont Heritage Place",
        "stars": 5,
        "price": {
            "queen": 100,
            "king": 150,
            "twin": 95,
            "extra_bed": 30
        },
        "images": [
            "https://pix10.agoda.net/hotelImages/179/179707/179707_17062108280053916983.jpg?s=1024x768",
            "https://www.fairmont.com/assets/0/137/10461/10520/10522/15213/670f3766-5ab6-43fb-90d6-849af77c73f8.jpg",
            "https://s-ec.bstatic.com/images/hotel/max1024x768/140/140313454.jpg"
        ]
    },
    {
        "name": "Ruci's Inn",
        "stars": 4,
        "price": {
            "queen": 700,
            "king": 750,
            "twin": 650,
            "extra_bed": 100
        },
        "images": [
            "http://ttnotes.com/images/ruci-art-space-jakarta-4.jpg",
            "https://pix10.agoda.net/hotelImages/245/2450906/2450906_17110914020059001050.jpg?s=1024x768",
            "https://images.trvl-media.com/hotels/17000000/16480000/16474800/16474786/c2f0b4a1_z.jpg"
        ]
    },
    {
        "name": "Honest Lodge",
        "stars": 5,
        "price": {
            "queen": 970,
            "king": 1075,
            "twin": 365,
            "extra_bed": 110
        },
        "images": [
            "https://c1.staticflickr.com/6/5165/5321195676_4431f1ffa7_b.jpg",
            "https://c1.staticflickr.com/4/3653/3338497500_af44e3c1b3_b.jpg",
            "https://static1.squarespace.com/static/577234532994ca52eb5d3d47/t/5781b649ebbd1acae3a12553/1468334960294/phinda+bedroom"
        ]
    },
    {
        "name": "Passo Inn",
        "stars": 4,
        "price": {
            "queen": 80,
            "king": 76,
            "twin": 64,
            "extra_bed": 18
        },
        "images": [
            "https://ihg.scene7.com/is/image/ihg/holiday-inn-express-and-suites-paso-robles-4469050134-2x1?wid=940&hei=470",
            "https://exp.cdn-hotels.com/hotels/29000000/28980000/28975600/28975544/bf3443c7_z.jpg",
            "https://images.trvl-media.com/hotels/1000000/30000/27700/27694/cf830154_z.jpg"
        ]
    },
        {
        "name": "Pamura Inn",
        "stars": 3,
        "price": {
            "queen": 470,
            "king": 475,
            "twin": 465,
            "extra_bed": 130
        },
        "images": [
            "https://exp.cdn-hotels.com/hotels/2000000/1290000/1280700/1280690/aca0bda3_z.jpg",
            "https://exp.cdn-hotels.com/hotels/2000000/1290000/1280700/1280690/1f74984b_z.jpg",
            "https://exp.cdn-hotels.com/hotels/2000000/1290000/1280700/1280690/f0b08f39_z.jpg"
        ]
    },
        {
        "name": "Falupa Palace",
        "stars": 5,
        "price": {
            "queen": 700,
            "king": 755,
            "twin": 650,
            "extra_bed": 100
        },
        "images": [
            "https://travel-blog.waytoindia.com/wp-content/uploads/2017/10/19.jpg",
            "https://cdn.cnn.com/cnnnext/dam/assets/130514132501-hyderabad-palace-ballroom-falaknuma-horizontal-large-gallery.jpg",
            "https://ichef.bbci.co.uk/news/1024/media/images/79420000/jpg/_79420530_photo2.jpg"
        ]
    },
    {
        "name": "Bagicha Palace",
        "stars": 4,
        "price": {
            "queen": 170,
            "king": 752,
            "twin": 654,
            "extra_bed": 210
        },
        "images": [
            "https://www.varunajithesh.com/wp-content/sabai/File/files/l_c35981ff1c60c9a878264b4590d4ec1e.jpg",
            "https://media.weddingz.in/images/d9ca2841015c0cb3818ab04e74f05032/b2.jpg",
            "https://pix10.agoda.net/hotelImages/176/1766631/1766631_17010515160050146636.jpg?s=1024x768"
        ]
    },
    {
        "name": "Haveli Palace",
        "stars": 5,
        "price": {
            "queen": 470,
            "king": 675,
            "twin": 365,
            "extra_bed": 210
        },
        "images": [
            "https://t-ec.bstatic.com/images/hotel/max1024x768/347/34741215.jpg",
            "https://pix10.agoda.net/hotelImages/438/43834/43834_15070613290031723307.jpg?s=1024x768",
            "https://ssl.c.photoshelter.com/img-get2/I0000pDrXrO7OLVk/fit=1000x750/111028-1239-5097-Mogul-room-Haveli-Palace-Hotel.jpg"
        ]
    },
    {
        "name": "Taj Palace",
        "stars": 4,
        "price": {
            "queen": 370,
            "king": 475,
            "twin": 165,
            "extra_bed": 50
        },
        "images": [
            "https://exp.cdn-hotels.com/hotels/1000000/470000/465100/465005/465005_61_z.jpg",
            "https://t-ec.bstatic.com/images/hotel/max1024x768/152/152060753.jpg",
            "https://exp.cdn-hotels.com/hotels/1000000/470000/465100/465005/7692d21b_z.jpg"
        ]
    }
];

const queen = [
"https://i1.wp.com/www.disneytouristblog.com/wp-content/uploads/2015/08/grand-floridian-wide-room-disney-world.jpg", 
"https://exp.cdn-hotels.com/hotels/20000000/19430000/19420400/19420394/2de9c181_z.jpg", 
"https://i2.wp.com/www.disneytouristblog.com/wp-content/uploads/2011/10/caribbean-beach-resort-remodeled-rooms-disney-world-beds.jpg?ssl=1", 
"https://t-ec.bstatic.com/images/hotel/max1024x768/800/80056500.jpg",
"https://media.expedia.com/hotels/1000000/30000/21400/21372/0a958a9e_z.jpg", 
"https://greenvalleyranch.sclv.com/~/media/Images/Page-Background-Images/GVR/Hotel/Gvr-DeluxeTwoQueen-m.jpg?h=1000&la=en&w=1000", 
"https://images.trvl-media.com/hotels/7000000/6140000/6133900/6133862/e98e0093_z.jpg", 
"https://home2suites3.hilton.com/resources/media/ht/SEAUKHT/en_US/img/shared/full_page_image_gallery/main/HT_2queenstudio_10_990x410_FitToBoxSmallDimension_Center.jpg",
"https://www.marinadelreyhotel.com/application/files/6714/5132/4442/waterfront_marina_del_rey_hotel.jpg", 
"http://www.orcainnwa.com/wp-content/uploads/2014/08/TQQ2.jpg",
"https://www.ahstatic.com/photos/6214_roqed_00_p_1024x768.jpg", 
"https://www.ahstatic.com/photos/9375_roqea_00_p_1024x768.jpg", 
"https://images.trvl-media.com/hotels/22000000/21480000/21476800/21476719/9451ad2b_z.jpg", 
"https://sw1669.smartweb-static.com/upload_dir/pics/queen-room-hotel-oasia-1020px.w1020.h450.fill.jpg", 
"http://casaportuguesa.es/wp-content/uploads/cache/images/remote/hotelcasaportuguesa-es/habitacion-especial-hotel-casa-portuguesa-2721216866.jpg", 
"https://images.trvl-media.com/hotels/23000000/22130000/22122300/22122242/186fcc2f_z.jpg", 
"http://hotelruidoso.net/wp-content/uploads/2018/02/two-queen-size-beds.jpg", 
"https://www.hotelmonkyimojong.com/wp-content/uploads/2015/10/QBR6-1000x1000.jpg", 
"https://i2.wp.com/wheelchairtravel.org/wp-content/uploads/2017/01/hyatt-centric-arlington-king-size-bed.jpg?resize=1000%2C750&ssl=1" 
];

const king = [
"http://santafestation.sclv.com/~/media/Images/Page-Background-Images/Santa-Fe/SF_Hotel_King.jpg?h=630&la=en&w=1080", 
"https://mysmahome.com/wp-content/uploads/2017/12/121117hilton.jpg",
"https://exp.cdn-hotels.com/hotels/1000000/30000/20200/20116/20116_200_z.jpg", 
"https://pix10.agoda.net/hotelImages/248/248202/248202_15080512470033680626.jpg?s=1024x768", 
"https://images.trvl-media.com/hotels/1000000/870000/861100/861085/76c25050_z.jpg",
"https://s-ec.bstatic.com/images/hotel/max1024x768/653/65363288.jpg",
"https://images.trvl-media.com/hotels/1000000/910000/907300/907300/a97cf3c5_z.jpg",
"https://static1.squarespace.com/static/52ccee75e4b00bc0dba03f46/t/5810b073bebafbd2fabc0408/1480931063859/", 
"https://q.bstatic.com/images/hotel/max1024x768/660/66092910.jpg",
"http://hiltonsurfersparadise.com.au/app/uploads/2015/11/Hilton-King-Executive-Room1-1024x687.jpg", 
"http://www.righthomefurniture.com/photo/pl17982786-hotel_room_large_bedroom_walnut_wood_king_size_bed_luxury_nightstand_and_marble_top_writing_desk_with_lounge_sofa_set.jpg", 
"https://www.theparchotel.com/files/3874/the-parc-hotel-guest-king-bed5.jpg", 
"https://wedding-pictures.onewed.com/match/images/22222/hotel-room-2.full.jpg", 
"https://eegloo.net/wp-content/uploads/2018/03/Hotel-King-Size-Bed-Suite.jpg", 
"http://almondtreeinn.com/img/gallery/f/King-Deluxe-Room.jpg", 
"https://i2.wp.com/wheelchairtravel.org/wp-content/uploads/2017/09/ac-hotel-chicago-bed.jpg?resize=1000%2C671&ssl=1", 
"https://www.chateaudelaresle.com/wp-content/uploads/2013/12/King-size-bed-Chablis-hotel-room-Ch%C3%A2teau-de-la-Resle-Design-hotel-in-Burgundy-France.jpg", 
"https://vectortoons.com/wp-content/uploads/2015/03/a-fancy-hotel-room-with-king-size-bed.jpg",
"https://fitgers.com/wp-content/uploads/2013/05/Cityside-whirlpool-suite-bedroom-2.jpg"
];

const twin = [
"https://images.trvl-media.com/hotels/1000000/20000/18600/18582/e6f244d6_z.jpg", 
"https://beedly.com/a/2018/01/hollywood-twin-bed-joined-twin-beds-hotels-in-twin-twin-and-double-bed-size-single-twin-bed-size-bed-length-room-for-twins-2-twin-size--970x546.jpg", 
"https://media.expedia.com/hotels/1000000/390000/385600/385545/385545_111_z.jpg",
"https://www.ahstatic.com/photos/7507_rotwb_00_p_1024x768.jpg", 
"https://www.kawadahotel.com/gallery-images/properties/5/4/6/KAWADA_Two_Bedded_Twin_Room.jpg", 
"https://r-fa.bstatic.com/xdata/images/xphoto/1024x768/37643566.jpg?k=275db927dbbeaf872a554805c924185225a2cb68d4dd014eb346b0aa131d2241&o=", 
"http://odis.homeaway.com/odis/listing/2fe44243-4a91-412b-aace-65d7242b2f28.c10.jpg",
"https://s-ec.bstatic.com/images/hotel/max1024x768/750/75073764.jpg ”, “http://odis.homeaway.com/odis/listing/297d50fc-783a-4719-af53-6e2dfc773151.c10.jpg", 
"https://odis.homeaway.com/odis/listing/08c3702d-6041-47b1-b78a-0b0d95be7dce.c10.jpg",
"http://elillyhotel.com/wp-content/uploads/2013/07/twin-bed-rooms.jpg", 
"http://hotelglobo.com/wp-content/uploads/2013/11/globo-0001.jpg", 
"http://deparkviewhotel.com/wp-content/uploads/2015/05/DSC_9973_Twin-Sharing.jpg", 
"http://dosnacionestv.info/wp-content/uploads/2018/10/bed-widths-bed-widths-single-bed-twin-bed-twin-size-bed-size-twin-room-double-bed-width-long-twin-bed-size-double-twin-bed-size-hotel-twins-twin-and-single-bed-standard-bed-widths-australia.jpg", 
"https://hotelauroraperm.weebly.com/uploads/5/4/6/9/54690695/1923599_orig.jpg", 
"http://jjtreeservices.co/wp-content/uploads/2018/05/double-twin-bed-single-bed-vs-twin-double-vs-twin-bed-large-size-of-twin-bed-hotel-room-and.jpg", 
"http://curlyque.co/wp-content/uploads/2018/02/twin-bed-vs-double-bed-bedroom-twin-vs-double-room-twin-bed-vs-queen-difference-between-double-bed-and-king-size-what-is-a-twin-room-in-a-hotel-different-types-beda-twin-dan-double-room.jpg", 
"http://makeartstudio.co/wp-content/uploads/2018/07/large-size-of-twin-bed-hotel-room-vs-double-what-is-the-difference-dimensions-queen-as-single-beds-and-does-d.jpg", 
"http://saldissimi.club/wp-content/uploads/2018/02/twin-doubler-bed-size-bed-frame-hotel-room-headboard-for-double-beds-contemporary-wooden-hotel-room-twin-bed-doubler.jpg", 
"http://violettesdream.com/wp-content/uploads/2018/08/two-twin-beds-two-twin-size-beds-equal-two-twin-beds-make-a-king-large-size-of-bedroom-hotel-tower-hotel-double-twin-bedroom-two-twin-beds-do-two-twin-size-beds-equal-twin-beds-for-sale-by-owner.jpg", 
];


const double = [
"https://snoozerpetproducts.com/wp-content/uploads/2009/08/luxury-square-dog-bed-with-memory-foam-157.jpg",
"https://pix10.agoda.net/hotelImages/471/47102/47102_15110511260037509590.jpg?s=1024x768",
"https://i1.wp.com/www.disneytouristblog.com/wp-content/uploads/2015/08/grand-floridian-wide-room-disney-world.jpg",
"https://images.oyster.com/photos/deluxe-room--v17461508-720.jpg",
"https://pix10.agoda.net/hotelImages/400/400012/400012_15092809270036428745.jpg?s=1024x768",
"https://pix10.agoda.net/hotelImages/933/93360/93360_18020203310061477061.jpg",
"http://www.zionlodge.com/assets/ZionLodge-Standard-SQ2.jpg",
"https://www.ahstatic.com/photos/0937_rod2b_00_p_1024x768.jpg",
"https://cache.radissonhotels.com/ow-cms/rad/images/hotels/CAFIGUER/NEW_PILOT/LACA_69482961_Standard_Double_USCView_960.jpg",
"https://media.expedia.com/hotels/7000000/6280000/6272000/6271901/6271901_33_z.jpg",
"https://media.expedia.com/hotels/1000000/870000/861900/861823/861823_97_z.jpg",
];
