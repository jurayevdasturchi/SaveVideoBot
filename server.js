require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios");
const { read_file, write_file } = require('./fs/fs')
const youtubedl = require("youtube-dl-exec");
const { parse } = require('dotenv');

const bot = new TelegramBot(process.env.BOT_API_KEY, { polling: true })

let smsInsta = null;
let smsYt = null;
let smsTk = null;
let smsTk2 = null;
let smsTk3 = null;

bot.onText(/start/, msg => {
    let users = read_file('users.json');
    let foundedUser = users.find(s => s.id == msg.from.id);
    if (foundedUser) {
        if (foundedUser.language == "uzb") {
            bot.sendMessage(msg.chat.id, "<b>Yana bir bor salom va bizning botimizga xush kelibsiz 😀</b>\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot 👉🏻 @SaveeVideosBot", {
                parse_mode: 'HTML'
            })
        }
        else if (foundedUser.language == "rus") {
            bot.sendMessage(msg.chat.id, "<b>Еще раз привет и добро пожаловать в наш бот 😀</b>\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\n Быстрый бот 👉🏻 @SaveeVideosBot", {
                parse_mode: 'HTML'
            })
        }
        else if (foundedUser.language == "eng") {
            bot.sendMessage(msg.chat.id, "<b>Hello again and welcome to our bot 😀</b>\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\n Fast bot 👉🏻 @SaveeVideosBot", {
                parse_mode: 'HTML'
            })
        }
    }
    else {
        bot.sendMessage(msg.chat.id, "<b>Hello and welcome to our bot 😀</b>\n\n<i>Select the language..👇🏻</i>", {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🇺🇿 Uzbek",
                            callback_data: "uzb"
                        },
                        {
                            text: "🇷🇺 Russian",
                            callback_data: 'rus'
                        },
                        {
                            text: "🇺🇸 English",
                            callback_data: "eng"
                        }
                    ]
                ]
            }
        })
    }


    bot.on("callback_query", msg => {
        let langu = "eng";
        if (msg.data == 'uzb') {
            langu = "uzb"
            bot.sendMessage(msg.message.chat.id, "Siz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot 👉🏻 @SaveeVideosBot")
        }

        else if (msg.data == 'rus') {
            langu = "rus"
            bot.sendMessage(msg.message.chat.id, "Вы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\n Быстрый бот 👉🏻 @SaveeVideosBot")

        }

        else if (msg.data == 'eng') {
            langu = "eng"
            bot.sendMessage(msg.message.chat.id, "You can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\n Fast bot 👉🏻 @SaveeVideosBot")

        }

        try {
            let user = {}
            if (foundedUser) {
                console.log("Bu user ro'yxatdan o'tgan!");
                return;
            }
            else {
                user = {
                    id: msg.from.id,
                    first_name: msg.from.first_name,
                    username: msg.from.username,
                    language: `${langu}`
                }
                users.push(user);
            }
            write_file("users.json", users);
        }
        catch { err } {
            console.error(err)
        }
    })
})


bot.onText(/settings/, msg => {
    let users = read_file('users.json');
    let foundedUser = users.find(s => s.id == msg.from.id);
    if (foundedUser.language == "eng"){
        bot.sendMessage(msg.chat.id, "<b>Select the language..👇🏻</b>", {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🇺🇿 Uzbek",
                            callback_data: "uzb"
                        },
                        {
                            text: "🇷🇺 Russian",
                            callback_data: 'rus'
                        },
                        {
                            text: "🇺🇸 English",
                            callback_data: "eng"
                        }
                    ]
                ]
            }
        })
    }
    else if (foundedUser.language == "rus"){
        bot.sendMessage(msg.chat.id, "<b>Выберите язык..👇🏻</b>", {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🇺🇿 Uzbek",
                            callback_data: "uzb"
                        },
                        {
                            text: "🇷🇺 Russian",
                            callback_data: 'rus'
                        },
                        {
                            text: "🇺🇸 English",
                            callback_data: "eng"
                        }
                    ]
                ]
            }
        })
    }
    else if (foundedUser.language == "uzb"){
        bot.sendMessage(msg.chat.id, "<b>Tilni tanlang..👇🏻</b>", {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🇺🇿 Uzbek",
                            callback_data: "uzb"
                        },
                        {
                            text: "🇷🇺 Russian",
                            callback_data: 'rus'
                        },
                        {
                            text: "🇺🇸 English",
                            callback_data: "eng"
                        }
                    ]
                ]
            }
        })
    }

    bot.on("callback_query", msg => {
        let langu = "eng";
        if (msg.data == 'uzb') {
            langu = "uzb"
            bot.sendMessage(msg.message.chat.id, "Siz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot 👉🏻 @SaveeVideosBot")
        }

        else if (msg.data == 'rus') {
            langu = "rus"
            bot.sendMessage(msg.message.chat.id, "Вы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\n Быстрый бот 👉🏻 @SaveeVideosBot")
        }

        else if (msg.data == 'eng') {
            langu = "eng"
            bot.sendMessage(msg.message.chat.id, "You can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\n Fast bot 👉🏻 @SaveeVideosBot")
        }

        try {
            for (let i in users){
                if (foundedUser.id == users[i].id){
                    users[i].language = `${langu}`
                }
            }
            write_file("users.json", users);
        }
        catch { err } {
            console.error(err)
        }
    })
    
})


bot.on("message", msg => {
    smsInsta = msg.text.slice(0, 25);
    smsTk = msg.text.slice(0, 22);
    smsTk2 = msg.text.slice(0, 21);
    smsTk3 = msg.text.slice(0, 21)
    let users = read_file('users.json');
    let lang = users.find(s => s.id == msg.from.id);

    // Instagram Download

    if (smsInsta == "https://www.instagram.com") {
        const options = {
            method: 'GET',
            url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
            params: { url: `${msg.text}` },
            headers: {
                'X-RapidAPI-Key': 'f068b0f4aemsha63c6058383cf36p15a3d3jsn853e230ad7fe',
                'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com'
            }
        };

        axios.request(options).then(async function (response) {
            if (response.data.image && response.data.video) {
                if (lang.language == "uzb") {
                    await bot.sendVideo(msg.chat.id, `${response.data.video}`, {
                        caption: `<b>Video, ushbu bot orqali yuklandi</b> 👉🏻 @SaveeVideosBot`,
                        parse_mode: 'HTML'
                    })
                }
                else if (lang.language == "rus") {
                    await bot.sendVideo(msg.chat.id, `${response.data.video}`, {
                        caption: `<b>Видео, было загружено этим ботом</b> 👉🏻 @SaveeVideosBot`,
                        parse_mode: 'HTML'
                    })
                }
                else if (lang.language == "eng") {
                    await bot.sendVideo(msg.chat.id, `${response.data.video}`, {
                        caption: `<b>The video was uploaded by this bot</b> 👉🏻 @SaveeVideosBot`,
                        parse_mode: 'HTML'
                    })
                }
                if (response.data.caption) {
                    await bot.sendMessage(msg.chat.id, `${response.data.caption}`)
                }
            }

            else if (!response.data.image && !response.data.video) {
                let id = null;
                for (let i in response.data) {
                    if (i != 'caption') {
                        let lamp = response.data[i].includes('mp4');
                        if (lamp) {
                            if (lang.language == "uzb") {
                                await bot.sendVideo(msg.chat.id, `${response.data[i]}`, {
                                    caption: "<b>Video, ushbu bot orqali yuklandi</b> 👉🏻 @SaveeVideosBot",
                                    parse_mode: 'HTML'
                                })
                            }
                            else if (lang.language == "rus") {
                                await bot.sendVideo(msg.chat.id, `${response.data[i]}`, {
                                    caption: "<b>Видео, было загружено этим ботом</b> 👉🏻 @SaveeVideosBot",
                                    parse_mode: 'HTML'
                                })
                            }
                            else if (lang.language == "eng") {
                                await bot.sendVideo(msg.chat.id, `${response.data[i]}`, {
                                    caption: "<b>The video was uploaded by this bot</b> 👉🏻 @SaveeVideosBot",
                                    parse_mode: 'HTML'
                                })
                            }
                            id = +i
                            id += 1
                            id = id + ""
                        }
                        else if (id != i) {
                            if (lang.language == "uzb") {
                                await bot.sendPhoto(msg.chat.id, `${response.data[i]}`, {
                                    caption: "<b>Rasim, ushbu bot orqali yuklandi</b> 👉🏻 @SaveeVideosBot",
                                    parse_mode: 'HTML'
                                })
                            }
                            else if (lang.language == "rus") {
                                await bot.sendPhoto(msg.chat.id, `${response.data[i]}`, {
                                    caption: "<b>Изображение загружено этим ботом</b> 👉🏻 @SaveeVideosBot",
                                    parse_mode: 'HTML'
                                })
                            }
                            else if (lang.language == "eng") {
                                await bot.sendPhoto(msg.chat.id, `${response.data[i]}`, {
                                    caption: "<b>Image uploaded by this bot</b> 👉🏻 @SaveeVideosBot",
                                    parse_mode: 'HTML'
                                })
                            }
                        }
                    }

                }
                if (response.data.caption) {
                    await bot.sendMessage(msg.chat.id, `${response.data.caption}`)
                }
            }

            else {
                if (lang.language == "uzb") {
                    await bot.sendPhoto(msg.chat.id, `${response.data.image}`, {
                        caption: `<b>Rasim, ushbu bot orqali yuklandi</b> 👉🏻 @SaveeVideosBot`,
                        parse_mode: 'HTML'
                    })
                }
                else if (lang.language == "rus") {
                    await bot.sendPhoto(msg.chat.id, `${response.data.image}`, {
                        caption: `<b>Изображение загружено этим ботом</b> 👉🏻 @SaveeVideosBot`,
                        parse_mode: 'HTML'
                    })
                }
                else if (lang.language == "eng") {
                    await bot.sendPhoto(msg.chat.id, `${response.data.image}`, {
                        caption: `<b>Image uploaded by this bot</b> 👉🏻 @SaveeVideosBot`,
                        parse_mode: 'HTML'
                    })
                }
                if (response.data.caption) {
                    await bot.sendMessage(msg.chat.id, `${response.data.caption}`)
                }
            }
        }).catch(function (error) {
            console.error(error);
        });
    }


    // Tik Tok Download

    else if (smsTk == "https://www.tiktok.com" || smsTk2 == "https://vt.tiktok.com" || smsTk3 == "https://vm.tiktok.com") {
        const options = {
            method: 'GET',
            url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
            params: { url: `${msg.text}` },
            headers: {
                'X-RapidAPI-Key': 'd2ce3fe351msh8b4c0d91c7e861fp1cfebcjsnab883dc3d9f3',
                'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
            }
        };

        axios.request(options).then(async function (response) {
            if (lang.language == "uzb") {
                await bot.sendVideo(msg.chat.id, `${response.data.video[0]}`, {
                    caption: `<b>Video, ushbu bot orqali yuklandi</b> 👉🏻 @SaveeVideosBot`,
                    parse_mode: 'HTML'
                })
            }
            else if (lang.language == "rus") {
                await bot.sendVideo(msg.chat.id, `${response.data.video[0]}`, {
                    caption: `<b>Видео, было загружено этим ботом</b> 👉🏻 @SaveeVideosBot`,
                    parse_mode: 'HTML'
                })
            }
            else if (lang.language == "eng") {
                await bot.sendVideo(msg.chat.id, `${response.data.video[0]}`, {
                    caption: `<b>The video was uploaded by this bot</b> 👉🏻 @SaveeVideosBot`,
                    parse_mode: 'HTML'
                })
            }
            if (response.data.description) {
                await bot.sendMessage(msg.chat.id, `${response.data.description[0]}`)
            }
        }).catch(function (error) {
            console.error(error);
        });
    }


})


bot.on("message", msg => {
    let users = read_file('users.json');
    let lang = users.find(s => s.id == msg.from.id);


    // Super Admin Menyu

    if (msg.text == "SuperAdmin") {
        if (lang.SuperAdmin) {
            bot.sendMessage(msg.chat.id, "<b>Assalomu alaykum Katta Ho'jayin</b> 👨🏻‍💻", {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    keyboard: [
                        [
                            {
                                text: "✅ Post Joylash"
                            }
                        ],
                        [
                            {
                                text: "📂 Admin Qo'shish"
                            },
                            {
                                text: "🗑 Admini  O'chirish"
                            }
                        ],
                        [
                            {
                                text: "📃 Adminlar Ro'yxati"
                            }
                        ],
                        [
                            {
                                text: "📊 Statistika"
                            },
                            {
                                text: "🔝 Menyuni Yopish"
                            }
                        ]
                    ],
                    resize_keyboard: true
                })
            })
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }


    // Admin Menyu

    else if (msg.text == "Admin") {
        if (lang.admin) {
            bot.sendMessage(msg.chat.id, "<b>Assalomu alaykum Ho'jayin</b> 😊", {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    keyboard: [
                        [
                            {
                                text: "✅ Post Joylash"
                            }
                        ],
                        [
                            {
                                text: "📊 Statistika"
                            },
                            {
                                text: "🔝 Menyuni Yopish"
                            }
                        ]
                    ],
                    resize_keyboard: true
                })
            })
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }


    // Noto'g'ri so'rov Tekshiruv

    if (msg.text != "Yes : 1" && msg.text.slice(0, 14) != "PostAdminTexts" && msg.text.slice(0, 14) != "PostAdminVideo" && msg.text.slice(0, 14) != "PostAdminRasim" && (msg.text.slice(0, 13) != "Add Admin : @" && msg.text.slice(0, 13) != "Del Admin : @") && msg.text != "🔝 Menyuni Yopish" && msg.text != "🗑 Admini  O'chirish" && msg.text != "📂 Admin Qo'shish" && msg.text != "✅ Post Joylash" && msg.text != "📃 Adminlar Ro'yxati" && msg.text != "📊 Statistika" && msg.text != '/start' && msg.text != '/settings' && msg.text != "SuperAdmin" && msg.text != "Admin" && smsInsta != "https://www.instagram.com" && smsYt != "https://youtu.be" && smsTk != "https://www.tiktok.com" && smsTk2 != "https://vt.tiktok.com" && smsTk3 != "https://vm.tiktok.com") {
        if (lang.language == "uzb") {
            bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
        }
        else if (lang.language == "rus") {
            bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
        }
        else {
            bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
        }
    }
})







let obj = {};

bot.on("message", msg => {
    let users = read_file('users.json');
    let lang = users.find(s => s.id == msg.from.id);
    let sch = 1;

    if (msg.text == "📊 Statistika") {
        if (lang.admin || lang.SuperAdmin) {
            bot.sendMessage(msg.chat.id, `👥 Botdagi obunachilar:  ${users.length} ta \n\n 🔜 Oxirgi 24 soatda: ? ta obunachi qo'shildi \n 🔝 Oxirgi 1 oyda: ? ta obunachi qo'shildi \n 📆 Bot ishga tushganiga: ? kun bo'ldi \n\n 📊  @SaveeVideosBot statistikasi`)
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }

    else if (msg.text == "📃 Adminlar Ro'yxati") {
        if (lang.admin || lang.SuperAdmin) {
            let lamp = true;
            for (let i in users) {
                if (users[i].admin) {
                    bot.sendMessage(msg.chat.id, `${sch++} |  Id : ${users[i].id}  |  Name : ${users[i].first_name}  |  Username : @${users[i].username}`)
                    lamp = false;
                }
            }
            if (lamp) {
                bot.sendMessage(msg.chat.id, "Hozir Adminlar yo'q! ❌")
            }
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }

    }

    else if (msg.text == "✅ Post Joylash") {
        if (lang.admin || lang.SuperAdmin){
            bot.sendMessage(msg.chat.id, "<b>PostAdminRasim yoki PostAdminVideo</b>\n\n<b>Video yoki Rasim :</b>  (link)\n------------------------------\n<i>Shu ko'rinishda yuboring!</i> 👆🏻", {
                parse_mode: "HTML"
            });
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }

    else if (msg.text == "📂 Admin Qo'shish") {
        if (lang.admin || lang.SuperAdmin){
            bot.sendMessage(msg.chat.id, "<b>Add Admin : username</b> \n\n <i>Shu ko'rinishda yozing!</i>", {
                parse_mode: "HTML"
            })
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }

    else if (msg.text == "🗑 Admini  O'chirish") {
        if (lang.admin || lang.SuperAdmin){
            bot.sendMessage(msg.chat.id, "<b>Del Admin : username</b> \n\n <i>Shu ko'rinishda yozing!</i>", {
                parse_mode: "HTML"
            })
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }

    else if (msg.text == "🔝 Menyuni Yopish") {
        if (lang.admin || lang.SuperAdmin){
            bot.sendMessage(msg.chat.id, "Menyu o'chirildi..!", {
                reply_markup: {remove_keyboard: true}
            })
        }
        else {
            if (lang.language == "uzb") {
                bot.sendMessage(msg.chat.id, "❌ Siz bot tomonidan qo'llab-quvvatlanmaydigan havola yubordingiz!\n\nSiz menga Instagram, TikTok yoki YouTube dagi postga havolani yuborishingiz mumkin, u erda siz fotosurat, video va matnni yuklashingiz kerak - bir necha soniya ichida sizda ushbu fotosurat yoki video bo'ladi!\n\n Tezkor bot: @SaveeVideosBot")
            }
            else if (lang.language == "rus") {
                bot.sendMessage(msg.chat.id, "❌ Вы прислали ссылку, которая не поддерживается ботом!\n\nВы можете скинуть мне ссылку на пост в Instagram, TikTok или YouTube откуда нужно выгрузить фото, видео и текст — через пару секунд эта фотка или видос будут у вас!\n\nБыстрый бот: @SaveeVideosBot")
            }
            else {
                bot.sendMessage(msg.chat.id, "❌ You sent a link that is not supported by the bot!\n\nYou can send me a link to a post on Instagram, TikTok or YouTube from where you need to upload a photo, video and text - in a couple of seconds you will have this photo or video!\n\nFast bot: @SaveeVideosBot")
            }
        }
    }


    let admin = msg.text.slice(0, 13)
    let adm = msg.text.slice(13);

    if (admin == "Add Admin : @") {
        let addAdmin = users.find(s => s.username == adm);
        if (addAdmin) {
            for (let i in users) {
                if (users[i].username == adm && !users[i].admin) {
                    users[i].admin = true;
                    bot.sendMessage(users[i].id, "<b>Tabriklayman siz Admin bo'ldingiz!</b> 🎉\n\n<i>Admin menyuni ochish uchun</i> <b>[ Admin ]</b> deb yozing..!", {
                        parse_mode: 'HTML'
                    })
                    bot.sendMessage(msg.chat.id, "Admin muvaffaqiyatli qo'shildi 👍🏻")
                    write_file('users.json', users);
                }
            }
        }
        else {
            bot.sendMessage(msg.chat.id, `Bunday User @${adm} Yo'q ❌`)
        }
    }


    else if (admin == "Del Admin : @") {
        let addAdmin = users.find(s => s.username == adm);
        if (addAdmin) {
            for (let i in users) {
                if (users[i].username == adm && users[i].admin) {
                    users[i].admin = false;
                    bot.sendMessage(users[i].id, "<b>Kechirasiz siz Adminlikdan o'chirildingiz!</b> 😔", {
                        parse_mode: 'HTML',
                        reply_markup: {remove_keyboard: true}
                    })
                    bot.sendMessage(msg.chat.id, "Admin muvaffaqiyatli o'chirildi 👍🏻")
                    write_file('users.json', users);
                }
            }
        }
        else {
            bot.sendMessage(msg.chat.id, `Bunday User @${adm} Yo'q ❌`)
        }
    }

    let post = msg.text.slice(0, 14)
    if (post == "PostAdminRasim") {
        obj.rasim = msg.text.slice(24)
    }
    else if (post == "PostAdminVideo") {
        obj.video = msg.text.slice(24)
    }

    else if (post == "PostAdminTexts") {
        obj.text = msg.text.slice(24)
        bot.sendMessage(msg.chat.id, "POST tayorlansinmi? \n -------------------------\n\n Yes : 1 | No : 0")
    }

    if (!obj.text && obj.rasim || obj.video) {
        bot.sendMessage(msg.chat.id, "<b>PostAdminTexts</b>\n\n<b>Texts :</b> (text)\n------------------------------\n<i>Shu ko'rinishda yuboring!</i> 👆🏻", {
            parse_mode: 'HTML'
        });
    }

    if (obj.text && msg.text == "Yes : 1") {
        for (let i in obj) {
            if (i == 'rasim') {
                bot.sendPhoto(msg.chat.id, `${obj.rasim}`, {
                    caption: `${obj.text}`,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "POST yuklansinmi | Ha ✅",
                                    callback_data: "yes"
                                },
                                {
                                    text: "POST yuklansinmi | Yo'q ❌",
                                    callback_data: 'no'
                                }
                            ]
                        ]
                    }
                })
            }
            else if (i == "video") {
                bot.sendVideo(msg.chat.id, `${obj.video}`, {
                    caption: `${obj.text}`,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "POST yuklansinmi | Ha ✅",
                                    callback_data: "yes"
                                },
                                {
                                    text: "POST yuklansinmi | Yo'q ❌",
                                    callback_data: 'no'
                                }
                            ]
                        ]
                    }
                })
            }
        }

        bot.on("callback_query", msg => {
            if (msg.data == 'yes') {
                bot.sendMessage(msg.message.chat.id, "POST yuklandi! ✅")
                for (let i in obj) {
                    for (let j in users) {
                        if (i == 'rasim') {
                            bot.sendPhoto(users[j].id, `${obj.rasim}`, {
                                caption: `${obj.text}`,
                                parse_mode: 'HTML',
                            })
                        }
                        else if (i == "video") {
                            bot.sendVideo(users[j].id, `${obj.video}`, {
                                caption: `${obj.text}`,
                                parse_mode: 'HTML',
                            })
                        }
                    }
                }
            }

            else if (msg.data == 'no') {
                bot.sendMessage(msg.message.chat.id, "POST o'chirildi! ✅")
            }
        })
    }


})
