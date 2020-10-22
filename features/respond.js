const resume = require('../public/resume.json');

const yellingResponses = ['No need to yell, I can hear you just fine!'];

const resumePrompts = ['resume', new RegExp(/[Rr][eé]sum[eé]/)];

const resumeResponses = [
  "I'm happy to share my resume!",
  "Here's my resume!",
  'I hope you enjoy viewing my resume!',
];

const resumeLink = `<a href="${resume.basics.resume}" target="_blank" rel="noreferrer noopener">Link</a>`;

const helloPrompts = [
  new RegExp(/\s*[Hh]i.*/),
  new RegExp(/\s*[Hh]ell.*/),
  new RegExp(/\s*[Hh]ey\s.*/),
  new RegExp(/\s*[Hh]owdy\s.*/),
  new RegExp(/\s*[Hh]ow[\'i ]*s it\s./),
];

const helloResponsesBase = [
  'Hello Human!',
  'How do you do?',
  'Nice to meet you Human.',
  'Hi!',
  'How’s it going?',
  'Hey!',
  'Hey there!',
  'Howdy!',
  'G`day human!',
  'Salut!',
  'Ciao!',
  'Hola!',
  'Shalom!',
];

const helloResponses = [
  ...helloResponsesBase,
  ...helloResponsesBase.map((res) => {
    const lower = res.toLowerCase();
    return lower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  }),
];
console.log(helloResponses);

const randomResponse = (responsesArr) => {
  const randNum = Math.floor(Math.random() * responsesArr.length);
  return responsesArr[randNum];
};

module.exports = function (controller) {
  controller.hears(
    ['allcaps', new RegExp(/^[A-Z\s]+$/)],
    ['message', 'direct_message'],
    async function (bot, message) {
      message = {
        ...message,
        text: message.text.toLowerCase(),
      };

      await bot.reply(message, randomResponse(yellingResponses));
      bot.changeContext(message.reference);
    }
  );

  controller.hears(
    resumePrompts,
    ['message', 'direct_message'],
    async function (bot, message) {
      await bot.reply(message, {
        text: `${randomResponse(resumeResponses)} ${resumeLink}`,
      });
    }
  );

  controller.hears(helloPrompts, ['message', 'direct_message'], async function (
    bot,
    message
  ) {
    await bot.reply(message, {
      text: randomResponse(helloResponses),
    });
  });
};
