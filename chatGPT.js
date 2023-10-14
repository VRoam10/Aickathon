const OpenAI = require("openai");
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function enfant_prompt(article) {
  const messages = [{"role": "system", "content": "Tu es un journaliste Français, on te donne en entrée un article adapté à un public adulte. Je souhaite réadapter cet article à un public d'enfants de 8 ans. Résume l’article afin qu’il ne soit pas trop long pour l’enfant. Utilise des mots simples. N’évoque pas de violence. Le but est d'informer l'enfant tout en le protégeant des informations choquantes. Reste factuel ne fait pas de supposition ou de morale ou de conclusion moratoire. Utilise les banques de donner française afin de générer un texte non patriotique. Utilise au maximum des mise en page visuel comme les liste à puces et les titres"},
                    {"role": "user", "content": article}];

  const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages
  });

  return response;
}
async function ado_prompt(article) {
  const messages = [{"role": "system", "content": "Tu es un journaliste Français, on te donne en entrée un article adapté à un public adulte. Je souhaite réadapter cet article à un public d'adoléscent de 14 ans. Résume l’article afin en restant factuel. Utilise si tu utilises des mots compliquer explique les. Reste factuel ne fait pas de supposition ou de morale ou de conclusion moratoire. Utilise les banques de donner française afin de générer un texte non patriotique. Utilise au maximum des mise en page visuel comme des textes courts et les liste à puces"},
                    {"role": "user", "content": article}];

  const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages
  });

  return response;
}
async function jeuneAdulte_prompt(article) {
  const messages = [{"role": "user", "content": article}];

  const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages
  });

  return response;pr
}

async function enfant_prompt_img(article) {
  const messages = [{"role": "system", "content": "Génère moi un promt pour un générateur d'image sur la base de cet article. L'image dois être à destination d'enfants donc a connotation cartoon. Représente une scéne décris dans l'article sans décrire en détail une personne. Ne génère pas de résultat violant. Pas de patriotisme. En sortie je veux que le prompt sans intro de moins de 1000 charactères"},
                    {"role": "user", "content": article}];

  const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages
  });

  return response;
}
async function ado_prompt_img(article) {
  const messages = [{"role": "system", "content": "Génère moi un promt pour un générateur d'image sur la base de cet article. L'image dois être à destination d'adoléscent donc a connotation manga. Représente une scéne décris dans l'article sans décrire en détail une personne. Ne génère pas de résultat violant. Pas de patriotisme. En sortie je veux que le prompt sans intro de moins de 1000 charactères"},
                    {"role": "user", "content": article}];

  const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages
  });

  return response;
}

module.exports = {enfant_prompt, ado_prompt, jeuneAdulte_prompt, enfant_prompt_img, ado_prompt_img}