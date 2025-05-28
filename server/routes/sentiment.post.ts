export default defineEventHandler(async (event) => {
  console.time('EXECUTION TIME');

  const body: { url: string, title: string } = await readBody(event);

  const urlSplit = body.url.split('?');
  const videoParams = urlSplit[1];

  const params = new URLSearchParams(videoParams);
  const videoId = params.get('v');

  // const comments = [
  //   'Thanks for trusting us to cut through the chaos. Ground News helps us do that. Try it yourself at https://spon.so/7885_GROUNDNEWS — 40% OFF the Vantage plan.',
  //   'I’m Canadian and very happy about our election. I definitely wouldn’t have voted conservative regardless of anything with Trump. If anything i think it made some ppl vote liberal instead of NDP to ensure the left vote wasn’t split and to rly ensure the conservatives didn’t win.',
  //   "Every time I watch this show I think he did not scrutinize Joe Biden as much as Trump. It's like the opposite of Joe Rogan.",
  //   'all cards are Chinese',
  //   "I can't wait for that cancer treatment to become global and then not have to pay a dime because i live in a civilized country.",
  //   "I'm Canadian, and while I wish I could have voted for another party, this election was too important to keep Canada from following in the States' footsteps. PP was WAY too heavily influenced by Trump's tactics - talking down to Canadians, using catchy slogans to lull easily influenced Canadians into voting for him. It's sad to see the MAGA mentality in Canada with Conservative voters. There's a lot of hate in that party towards First Nations, the LGBTQ+ community, women. I cannot express how relieved I was when PP lost the election. Do I think Carney is the best option? No. But he's not dangerous. PP is. His connection with the IDU really scares me. So my vote wasn't influenced by Trump directly, but in how PP was trying to emulate him so closely to manipulate Canadians. Just look how he's forced out Alberta's MP so he can run again. Who does that?",
  //   "I dont like you saying it's trumps fault. Its americas fault for letting trump get elected. There was a massive push not to vote for kamala because of her plans for Israel. If yall just smartened up this wouldn't have happened in the first place. FUCK the usa",
  //   'Thanks for talking about Canada!!',
  //   "I was sceptical when you said that Congress did something objectively good. I'm happily surprised. Good news indeed!",
  //   'What happens when you stifle and smother science? What happened in the past. Maybe learn from the past orange balloon.',
  //   'As a former Amazon seller, I have mixed feelings on them displaying tariff prices on the products. \n' +
  //     '\n' +
  //     "Overall I think it would be good, but it's also kinda hypocritical of them because they take such a big cut of the sales with their own fees. I highly doubt they would be transparent enough to display their own fees on the listings alongside the tariffs, to see how much extra the sellers (and therefore the customers) have already been paying just to use their marketplace.",
  //   '👉 WE/I ̲𝙽̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙴̲̲𝙳̲  a *BAMF* 𝕆ℕ𝕃𝕐 playlist! 👈\r\n' +
  //     '🤩That and/or a *_"GOOD NEWS STORY OF THE DAY"_* playlist. 🤩\r\n' +
  //     'ASAP!!!\r\n' +
  //     '\r\n' +
  //     'Go into the archives if you have to 👀👀👀\r\n' +
  //     '\r\n' +
  //     'I also suggest full news stories in their own video and not just bookmarked... anyone with suggestions of how to send a single story would be greatly appreciated.\r\n' +
  //     '\r\n' +
  //     'If the above suggestion (each full story having its own complete video) is not possible for audience members to clip and send... sorry DeFranco team this plus the BAMF/GNS playlist may be more work to do... 😅',
  //   'I dont vare what party takes plurality, the fact liberals got that many extra seats but that few % difference total vote is somewhat concerning over gerrymandering',
  //   'The NCII bill will put a LOT of GenZ incel MAGAs in prison.',
  //   'I understand deep fakes are wrong and there should be protections in place. but i hope we dont loose funny videos of the last 3 presidents of america playing minecraft together and roasting eachother. do you think there can be a happy middle ground where people understand something is a deep fake and made for satire?',
  //   'He did the best thing possible, with the same leadership Americas hat will continue to decline. half to population being homeless by 2030 is now possible.',
  //   'Every order I ever placed with Rihanna’s Savage X brand explicated the cost of tariffs. It always stood out to me. Now it makes sense. 💎',
  //   'US is that bully in high school that used to get away with things.. until college hits and everyone matured and now the bully is all alone.',
  //   "Yeah, Trump will sign that one particular bill because he didn't like when that Ai footage went around of him sucking on the toes of Elon Musk😅",
  //   `I am a long time fiscal conservative Canadian. Trump definitely was a consideration with a lot of people voting against Poilivre as "Maple Trump" and many thinking that Carney will be able to stand up to Trump better. I voted Liberal for the first time, not because of worry that Poilivre is like Trump, but because his platform was so vague and full of holes that I couldn't vote for him. Is "Anti-woke" saying that they are not going to allow penalization if someone says that there are only two genders, or does it say that they will be rolling back protections for trans gender people? There is a huge difference between the two and this was just one example of the vagaries. I think he was trying to not lose the far right and ended up losing the middle. Carney's platform was concise and although I didn't agree with all of it, I could see some strong positives.`,
  //   "These shows are so annoying now. I get there's a lot of political stuff going on. But it's the ONLY thing he talks about now I wish there was some balance in regular news and politics.",
  //   '<3',
  //   'canada has a dude that literally is gonna open your borders... next  PM should be an idian person',
  //   "Phil you're an honorable canadian come on up anytime",
  //   `Yeah no, they burned every bridge possible. No way in hell china is gonna negotiate cause they know for a fact they are the American production. Russia is very selfish, so trying to buddy buddy with em, is a losing game. The best trump can hope for from Putin is being allowed to step down under Russia law, rather than being shot and replaced with a body double and becoming a puppet state. His war on science is guaranteed to destroy every single megachurch, which is likely where a bunch of support is coming from, they'll likely say something along the lines of "God will protect me" but lets be real, God only helps those who helps themselves and they're actively trying to croak. Canada and Mexico are likely gonna play the part of vultures if Trump gets his way a bit too much, and worse yet, they'll be the good guys, providing disaster relief to those left.\n` +
  //     '\n' +
  //     `Currently Trump is flakey at best, and only answers to money, anything in the way of money is a roadblock to be removed. I even have a small theory that Elon isn't running from right wing boycotts, but rather Trump himself, cause I think a part of him realizes that when he runs out of money, he can't bribe Trump anymore, and he's the perfect "oh look I did something good" scapegoat (He's legit the only job stealing illegal immigrant I've ever seen). Unfortunately we're at the end of critical mass, no more land to get, no real advancements, with thousands spent on tax breaks for the rich, that are better spent making sure the current working force continues working, and absolutely nothing worth exporting. This is a problem with the united states even before Trump, but he decided to essentially crimp America's arteries to get enough blood in the heart, making each problem one we have to fix now, rather than spend a million dollars and not worry about it for a year like we have been.\n` +
  //     '\n' +
  //     `It's ripping the curtain back and revealing the class war that has always been a staple of America and the insane amount of waste that comes from that. The "think of the children" party are now having to justify a lot of child abuse, and most have just given up and are now pretending a future plan is at play. America isn't just in a dark patch, it is now a festering rotting wound, that not even the parasites that once reveled in it, can leech from it, it is that diseased. Trump has definitely brought about change, and I'm certain he'll hate it, cause it isn't gonna be the rich get richer, it's a devaluing of the American dollar to the point of being unusable, simply cause there's nobody willing or able to sell us anything anymore.`,
  //   'Out dated terminology is outdated. For reference, I’m talking about the deep fake topic. That monsters got about 100 different heads now.',
  //   'Title feels clickbait when ye drop Taylor Swift’s name with so little pertaining to her.',
  //   'Investing in Flixy5 FLX presale feels like catching Ethereum in its early days. Huge potential here!',
  //   'It’s so amusing how liberals will grasp at anything they can claim is a “win” for them, even when it’s not even taking place in America,  bc they’ve so thoroughly alienated the American ppl through their fringe identity politics instead of helping  the average working tax-paying American',
  //   `Canadian here. I voted against Mr. Pierre, not Trump. I believe in the freedom and rights of all peoples, citizens or not. LGBTQ+, immigrants, First Nations people. Anybody in this country should stand on equal footing, and Mr. Poiliviere stands for tax cuts, inequal opportunity through removal of assistance programs, and anti "WOKE". Anti woke.. That's the Biggest red flag right there..`,
  //   'born to vote NDP/green voted liberal to save canadians',
  //   "Canadian here, I always vote against the Conservatives.  Especially as the Liberals or NDP try to lift up minority populations where the Conservatives are too self involved and don't care about others as a whole.  It's becoming more polarized with Poilievre having echoed the same things as Trump, and we don't need a fascist country if we want to move forward.  I voted Liberal because they were more likely to win, and too much is at stake.  With Mark Carney being involved in economic sciences, he will understand far more of what Trump is doing and how it will impact the country, to navigate the nonsense.  This will also allow us to work with other countries to build up alternate relationships.  Especially with the economic center being Toronto, which is one of the most culturally diverse cities in the world",
  //   'these are victims of Deepfakes/Revenge P* ,\nnot "survivors"  bro 💀',
  //   "normally i wouldn't vote liberal but with the way PP was running the conservatives... i just couldn't trust that they had our best interests at heart. that combined with some of his really shit policies (like the housing one. fing yikes) and carney being more of an economist, i had to go liberal.\n" +
  //     "i've watched the conservatives slide away from what should be their party values (working class, fiscal responsibility, minimal governmental interference) and i'm hoping this election wakes them up that this new position they're touting isn't popular.",
  //   `As a Canadian, most of us only happy it's a minority... Stupid people are stupid though. New face, new party? Nope still liberals. Who wants to bet on how long it will take for the Liberals to reinstate the carbon taxes? Bring on the "you will own nothing and will be happy" bullshit for the next 4 years.`,
  //   'The only reason why the citizen consumers are paying the cost of tariffs is because the multimillionaires/billionaires that onw/rune the companies dont want to take a minor pay cut and instead raised the prices to cover tariffs and added a but more to pad their po kets even more and people are still buying from those greedy companies like amazon and apple and others.',
  //   "They won't list tariff cost but they, and many others, will jack the prices and keep them jacked (like they did during the pandemic) and let you think it's the tariffs even if the administration rolls back.",
  //   'glad to hear about the take it down act!',
  //   'My children are Canadian and fk Trump and fk Carney. Relationships will always take precedence over politicians.',
  //   "I wonder if Canada is planning on building their national defense or if they still plan on relying 90% on America's help?",
  //   'Canadian here. There are a lot of issues to vote on  but I decided to pick one and I voted mainly to save the CBC. I know how much work the journalists do to stay true to their mission and principles and I saw a very concerning rhetoric coming from the conservative platform suggesting that defunding the CBC (which was already bad enough) was only the beginning. I feel like most Canadians are tired of the divisive politics and stupid catch phrases more than they were tired of a liberal government. As someone who usually votes orange I felt like the possibility of a conservative majority where the party was this prone to catering to the far right was too dangerous. If the Cons had taken a gentler approach, they very likely could have gotten a lot more votes. Poilievre is an insufferable career politician and Carney is a level headed banker... I know who I believe can competently manage a country.',
  //   'Yes we did vote to self euthanize and its very dissapointing',
  //   "I Vote NDP one of BCs only NDP holdouts, we vote for who has our best interest for our local area, which has always been anyone who isn't Conservative, since the last run of conservative leadership in BC we learned that Conservatives strip your province of value to satisfy a budget in the short term, not realizing or not caring about the financial ramifications in the long term",
  //   "I'm from Canada and our system has been a bit frustrating lately: in provincial elections, there were many ridings that voted majority left-leaning, but it was split between the Green Party, the NDP, and the Liberals. Meanwhile, the right-leaning votes went solely to the Conservatives which ultimately led to the majority and subsequent triumph of Doug Ford. We're not bipartisan (nor do I think we should be) but -- as someone who usually votes NDP for the Federal elections -- it's frustrating that I may have to cast my vote strategically to ensure the victory of a party I don't really like. But it's better than the Conservatives winning, by far.",
  //   'I’m Canadian I voted conservative. This has nothing to do with trump. My vote was based on finances. Housing crisis. Amount of people coming into the country, I’m not against people coming, we just don’t have the infrastructure. I’m also Jewish so antisemitism is at a high time high. Lastly the amount of crime',
  //   "I'm Canadian and voted Conservative, I'm obviously not happy about the outcome, but I accept it, the Conservatives clearly didnt win the heart of the voters, whether it be due to Trump, Pollievre's character or other factors. the largest factor was the decimation of the left wing vote in Canada, the Liberals largely benefited from a weak NDP and Green party. The Conservatives will only win the next election if Carney proves himself to be less from the centre as he says he is. The Liberals have a mostly centrist history, they were the party that a little over 20 years ago balanced our budget, we were running surpluses with no debt while still trying to manage our social programs as best as we could. Carney wants to return to that fiscal responsibility mixed with wise investments that deliver results. Either way despite what i voted for losing i think we might get a similar result from Carney at the end of the day, so long as he ditches the far left politics that the Liberals grifted towards under Trudeau.",
  //   `Trump played a role, yes, but even if Trump wasn't being a total dingdong, I wouldn't have voted conservative. Pollievre,  in my opinion, was rude, arrogant, and wanted to undo a lot of good in Canada with his "anti-woke" empty statements, and he voted against a woman's right to choose. He wanted to waste our time with nonsense internet problems and create dramatic soundbites rather than focussing on real problems. \n` +
  //     '\n' +
  //     'His only major comments for ex. affordable housing issues, was to just whine about the liberals and Justin Trudeau. Useless.',
  //   'The realization that "self-euthanasia" falls under bodily autonomy.',
  //   'My God. Philly D. the D stands for Dissing Jeff Bezos, Rightfully So!',
  //   'I was able to vote for my local NDP candidate from our NDP safe riding, ended up being one of like six NDP seats,\n' +
  //     'But really happy our guy kept his seat, he is a great MP.',
  //   "I don't deny climate change.  However, I do want to point out to people that the scientists at all of these agencies were there while the agencies got literally everything wrong about COVID.  First, we didn't need to mask.  Then, it was essential that we mask.  Then, the masks failed to stop the spread because, as it turns out, effective masking is a skill.  Then they told us the vaccine would stop us from getting sick and stop us from spreading the virus.  As it turns out, it doesn't prevent either of those things, though it will keep you from dying.  These are the people who insisted on the lockdowns.  Well, we had mind-meltingly worse outcomes than countries that did not lock down.\n" +
  //     '\n' +
  //     "Look, Trump's an arsehole, but at some point, you need to evaluate people in our institutions by their own failures.  It shouldn't matter who's saying these institutions suck, if they in fact suck.",
  //   'Its sad when I trust Xi more than the president.',
  //   "Dear everyone, expect the usa. Not all of us are crazy and truly we need help. Please! Help us! We don't know what to do!",
  //   `Trump will keeping burning the world to the ground until it's almost too late to bring it back, but then he will do all the damage he has caused and be like "look I saved America". Don't let history books write that if/when it happens`,
  //   "Canadian here. While PP's similarity to Trump in rhetoric and approach definitely didn't help, he was never getting my vote - in fact, that guy wasn't getting my vote even he were the leader of the Liberal party and Carney was conservative. Basically it came down to - do we want somebody competent, knowledgeable and intelligent in charge, or do we want a career politician who speaks in slogans, has not accomplished anything during his time, who constantly spouts lies and half-truths and thinks Trump is the bee's knees? It wasn't a difficult choice.",
  //   'Funny perspective coming from you Phil, to canadians Liberals are Center right and conservative are Right. NDP is center left. \n' +
  //     '\n' +
  //     'But yeah compared to the US, everything about us is left.',
  //   'As a Canadian it wasn’t trump who decided my vote, it was how the right wing media and government treats women, lgbtqia+, people with disabilities, low income people, indigenous peoples and basically everyone that’s not them. They care more about money and white Christian nationalists views than anything else.',
  //   `As a Canadian that has lived in the United States, Alabama and Georgia and is a Green Card Holder (gone through the first 4 with Trump) I have to say that I'm a happy with how the election in Canada went. Personally at the moment it would have been better for me to personally vote for "NPD" Orange as my life is in that "set" at the moment but I have to side with the "Libs" Red on the values that they are in support of. Even if it benefits a group that I'm not a part of at the moment, more in terms of my life at the moment and more am in a "needy state" now I know that the overall goals of the "Libs", my party, are in where we as a nation need to head.\n` +
  //     '\n' +
  //     'PS: Long Time Follower, glad to see you back in the peach state. On a off note are you going to go the 2026 FIFA World cup in LA or Atlanta, which is more home?',
  //   'Wasn’t there concerns that the take it down act is going to be abused to take down anything Trump doesn’t like?',
  //   'Take it Down Act can be abused by bad actors',
  //   'Guarantee Trump will use the Take it Down act to silence his critics. Deepfake porn is terrible, but free speech cannot be infringed which this bill allows.',
  //   'Singapore has a higher cancer survival rate than the US, so yes those numbers could be improved if we had universal healthcare on par with Singapore',
  //   "It's pretty sad that at the same time there is great news in cancer research that felon47 is cutting funding to it.",
  //   'Very nice video and nicely performed ❤❤❤',
  //   'Canadian checking in. Lifetime  NDP voter who held my nose to vote liberal.... in large part because of Trump... but mostly it was an "ABC" election - anyone but conservative. Strategic voting was a huge this time.',
  //   'Yeah, Trump Military Control, leading to his autocratic tyrannical rule. The Purge movies will become our reality! 🎉 Yay',
  //   "Trump is going to Trump. He'll lie, decieve, and refuse to negotiate, keeps doing whatever he desires and destroys our economy while blaming it on Biden Administration while it is occurring because of Trump Administration and all those who voted for him will believe his lying ass.",
  //   "Conservatives are republicans. I'm glad liberals won.",
  //   'trump the type of guy to call out fake news while lying about anything himself',
  //   'pokimane is an obnoxious and pretentious entitled 304',
  //   "Sorry I'm not digging the new hairstyle Phil, no offense or anything, just saying",
  //   'As a Canadian, I absolutely voted strategically to keep Pierre Poileevre out of power. I live in the only Liberal voting area in in Calgary (Calgary Confederation). I voted Liberal when I would normally have voted NDP.\n' +
  //     'Why did i vote this way? I DO NOT want Canada to become the 51st state...do not, and never will be American!\n' +
  //     'And we have to rein in our provincial premier Danielle Smith who is bending her knee to Trump...',
  //   'Hi 👋  from Canada 🇨🇦  I live in Ontario. Pierre is our version of Trump and Carney is like our version of Kamala. That is the best way I can describe it. We voted against extreme far right politics because we saw what is happening with Trump in the States. Many of us never want to see Pierre ever again. I voted for Carney 🇨🇦',
  //   "Canadian Zoomer here in one of the highest cost of living areas. I'm reasonably well educated in global politics, including Canada. I planned and voted liberal this year primarily because of Mark Carney himself, regardless of Trump's actions, though his handling of the tariffs situation was a strong plus. I voted for Carney because he actually has high-level economic experience and education, which is what this country desperately needs right now instead of the inept 2 previous leaders we've had who clearly harmed the economy for short term gain, which we are now feeling the catastrophic results of. If Carney ran as Conservative, I would have still voted for him, unless he adopted the anti woke bs rhetoric of Pollievre or however you spell his stupid name (I call him pp man).",
  //   'Phil ive been a follower for a long time but the fact you didnt mention detective richard hy in this one makes kinda disappointed in you',
  //   'It means we’re fucked',
  //   `Of course, the GOP shafts a bill passed by Dems under Biden only to reintroduce it and pass it under Trump - they love to take credit for everyone else's work. They're incapable of being anything resembling honest. Even when they do "good things" its only because it serves some selfish interest.`,
  //   'Dude didn’t say anything about Taylor swift lmao click baitttt',
  //   'Canadian here, I can speak for most of Canada when I say that we have been tired of our current government doing nothing. A lot of unfulfilled promises by our former priminister Justin Trudeau.\n' +
  //     '\n' +
  //     "People want change,  if it weren't for Donald Trump, concervatives would most likely have won. Our voting turned from fixing our issues to who can protect us against trump. Poilievre was not a fit for that role, so we are going back to liberal government hoping this time we'll see change but idk... my hopes aren't too high.",
  //   'Canadian here, First time coming across your channel. I really appreciate the attempt to stay out of the echo chambers. Keep up the good work.',
  //   "the Magahats that are commenting on OUR election should take note that people in Poilievre's  riding didn't want him, same can be said for Singh. They weren't really doing their Jobs. Poilievre didn't even release their party's platform until after everyone else and early voting had already begun. What some people don't realize, especially those in the states, is that Poilievre was the opposition critic before he became the opposition leader. So yea he has lots of catchy phrases and sound bites, from years of being a career politician, but didn't seem to have an actual plan, especially now.  \n" +
  //     '\n' +
  //     'and to answer your question I voted the way i did because Trudeau was out. If he had stuck around there is no way the liberals would have won.  Also if you want to see how far the NDP has fallen look back to the 2015 & 2011 election results',
  //   `21:03 The T Admin is complaining about people "not being held beyond their release dates"? That's incredibly weird. I'm having a hard time wrapping my head around that. People should be released on their RELEASE DATE, right. That's what a release date means.`,
  //   '5:58 dude I’ve seen ads for those deepfake or AI apps on YouTube. It’s surprising how blatant they are. Usually it’s framed like “see your crush the way you’ve always dreamed” like it’s just some nicey nothing thing. Glad this is getting passed!',
  //   'One thing to note. In some of the ridings the conservatives gained it was due to vote splitting on the left. In one particular unfortunate case a Green MP in Kitchener Center lost his seat to a conservative after 60% of the voters on the left split between the Greens and the Liberals. This is the failure of our first past the post system. Most people on the left want electoral reform. Trudeau promised it in 2015 and then didn’t do it. 😒 FPTP is not democratic and better systems exist.\n' +
  //     '\n' +
  //     'I want to add that I voted the way I did to avoid a Polievre government. I am tired of grievance politics and MAGA style culture wars.  However, my vote doesn’t actually matter because I am in a conservative riding that has no chance of any other party breaking through. Again, FPTP sucks and leaves a lot of people in Canada voting strategically and never feeling represented in parliament.',
  //   'ICO of the year? Flixy5 Network is definitely in the running with its unique approach to DeFi and AI.',
  //   'Time is running out! Flixy5 presale is nearly full—act fast before it closes!',
  //   'Over 75% tokens sold already? Flixy5 FLX presale is heating up! Get in while you can!',
  //   '5:07 It only took him 9 days for him to say he should be the next Pope. 😂',
  //   'Looking for a presale with strong fundamentals? Flixy5 Network is delivering on all fronts!',
  //   'Investing in Flixy5 FLX presale feels like catching Ethereum in its early days. Huge potential here!',
  //   'The best projects for bull run are usually those created after the bitcoin halving, like Flixy5 Network. Such projects can go 500x+ in a very short period, be aware of that.',
  //   'With the integration of AI, cross-chain and DeFi, Flixy5 Network is merging two worlds in a big way. This could be a game-changer.',
  //   'With so many tokens out there, it’s hard to find something unique. Flixy5 FLX seems to have cracked the code with its ecosystem. Time to get involved in presale.',
  //   'Investing in Flixy5 FLX presale feels like catching Ethereum in its early days. Huge potential here!',
  //   'Flixy5 Network is making big moves in the DeFi space. I’m thinking this might be a solid long-term hold.',
  //   'Trump is crypto’s wild card, and with Flixy5 Network strong fundamentals, this project is poised to thrive!',
  //   'Post election crypto pump is here!! Once new project like Flixy5 launch, big bucks will be made.',
  //   'Participated in the Flixy5 FLX presale today—super smooth process and incredible potential rewards!',
  //   'Bitcoin 100k+ is exciting, but projects like Flixy5 FLX token in their early stages can yield insane returns. Research is key!',
  //   'one additional aspect of the law enforcement EO is that they will be using the law firms that they made pledge pro bono work to trump, meaning that they would have conflict of interests in representing citizens in excessive force cases which might arise. they have effectively cut off many off the top firms from representing us in cases of civil rights overreaches by law enforcement'
  // ]
  const comments: string[] = await getCommentData(videoId);

  if(comments.length === 0) {
    createError({
      statusCode: 401,
      message: 'No Comments',
      data: {
        title: 'No Comments... Select new video.'
      }
    })
  }

  const sentimentRatio: {
    negative: number,
    neutral: number,
    positive: number,
  } = getSentiment(comments);

  // console.log(sentimentRatio);

  setResponseHeader(event, 'Access-Control-Allow-Origin', 'chrome-extension://onjgfikfmfiknmlnhnmmbnapbkphdnoc');

  console.timeEnd('EXECUTION TIME');

  return sentimentRatio;
});
