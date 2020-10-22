const resume = require('../public/resume.json');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');

// I'd love to have broken the responses out into separate files but for some reason
//  Botkit was NOT having it.

const linkify = (url, desc) =>
  `<a href="${url}" target="_blank" rel="noreferrer noopener">${desc}</a>`;

const openingResponses = {
  Projects: resume.projects,
  Work: resume.work,
  Website: resume.basics.url,
  Education: resume.education,
  'Tech Stack': resume.tech,
  'Contact Info': {
    email: `<a href="mailto:${resume.basics.email}">${resume.basics.email}</a>`,
    phone: resume.basics.phone,
  },
};

const yellingResponses = ['No need to yell, I can hear you just fine!'];

const resumePrompts = ['resume', new RegExp(/[Rr][eé]sum[eé]/)];

const resumeResponses = [
  "I'm happy to share my resume!",
  "Here's my resume!",
  'I hope you enjoy viewing my resume!',
];
const resumeLink = linkify(resume.basics.resume, 'Link');

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

const randomResponse = (responsesArr) => {
  const randNum = Math.floor(Math.random() * responsesArr.length);
  return responsesArr[randNum];
};

const formatProject = (project) => {
  const { name, url, description } = project;
  let text = `<strong>${linkify(url, name)}</strong>\n${description}`;
  text = `${text}
  (${linkify(project.repo, 'Github Repo')})`;
  return text;
};

const formatWork = (work) => {
  const { startDate, endDate, url, summary } = work;
  const start = format(parseISO(startDate), 'MMM yyyy');
  const end = format(parseISO(endDate), 'MMM yyyy');
  const company = url > '' ? `${linkify(url, work.name)}` : work.name;
  const position = `<span className="position">${work.position}</span>`;
  const name = `<span className="name">${company}</span>`;
  const topLine = `${position}&nbsp;|&nbsp;${name}`;
  const range = `<span className="range">${start} - ${end}</span>`;
  const description = `<span className="description">${summary}</span>`;

  let text = `${topLine}`;
  text = `${text}\n${range}`;
  text = `${text}\n${description}`;

  return text;
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

  // PROJECTS
  controller.hears('Projects', ['message', 'direct_message'], async function (
    bot,
    message
  ) {
    const response = resume.projects;
    await bot.reply(message, 'Here are some of my projects:');
    response.forEach(async (res) => {
      await bot.reply(message, formatProject(res));
    });
  });

  // WORK
  controller.hears('Work', ['message', 'direct_message'], async function (
    bot,
    message
  ) {
    const response = resume.work;

    await bot.reply(message, "Here's my professional experience:");

    response.forEach(async (work) => {
      await bot.reply(message, formatWork(work));
    });
  });
};
