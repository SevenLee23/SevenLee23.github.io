let wpRequire = webpackChunkdiscord_developers.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_developers.pop();

let ApexStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.createOverride).exports.A;
let UserStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.getCurrentUser).exports.A;
let FluxDispatcher = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.flushWaitQueue).exports.A;
let api = Object.values(wpRequire.c).find(x => x?.exports?.Bo?.get).exports.Bo;
let globalCopy = navigator.userAgent.includes("Firefox") ? navigator.clipboard.writeText.bind(navigator.clipboard) : copy
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const userId = UserStore.getCurrentUser().id
console.log("[Widget Creator] Creating a new app... Please solve the captcha if prompted")
const appRes = await api.post({url: "/applications", body: {name: "My New Widget", team_id: null}})
FluxDispatcher.dispatch({type: "APPLICATION_CREATE_SUCCESS", application: appRes.body})
const appId = appRes.body.id

console.log("[Widget Creator] Enabling social sdk...")
await api.post({url: `/applications/${appId}/social-sdk/enable`, body: {"name":"a","business_email":"foo@bar.com","game_or_studio_name":"a","game_or_studio_url":"","email_updates_consent":false,"country_or_region":"United States","title_role":"Founder","target_platforms":[],"form_type":"Dev Solutions","sfdc_leadsource":"Dev Portal","utm_campaign":"SDK Enable Form"}})

console.log("[Widget Creator] Creating a new widget...")
const configRes = await api.post({url: `/applications/${appId}/widget-configs`, body: {display_name: "My Widget"}})
const configId = configRes.body.config_id
await api.patch({url: `/applications/${appId}/widget-configs/${configId}`, body: {"surfaces":{"widget_top":{"layout":"widget_top_hero","components":{"hero_image":{"fields":{"image":{"presentation_type":"image","value_type":"data","value":"change this to an image"}}},"title":{"fields":{"text":{"presentation_type":"text","value_type":"custom_string","value":"some title here"}}}}},"widget_bottom":{"layout":"widget_bottom_stats","components":{"stat_1":{"fields":{"value":{"presentation_type":"text","value_type":"custom_string","value":"text 1 here"},"label":{"presentation_type":"text","value_type":"custom_string","value":"label 1 here"}}},"stat_2":{"fields":{"value":{"presentation_type":"text","value_type":"custom_string","value":"text 2 here"},"label":{"presentation_type":"text","value_type":"custom_string","value":"label 2 here"}}},"stat_3":{"fields":{"value":{"presentation_type":"text","value_type":"custom_string","value":"text 3 here"},"label":{"presentation_type":"text","value_type":"custom_string","value":"label 3 here"}}},"stat_4":{"fields":{"value":{"presentation_type":"text","value_type":"custom_string","value":"text 4 here"},"label":{"presentation_type":"text","value_type":"custom_string","value":"label 4 here"}}},"stat_5":{"fields":{"value":{"presentation_type":"text","value_type":"custom_string","value":"text 5 here"},"label":{"presentation_type":"text","value_type":"custom_string","value":"label 5 here"}}},"stat_6":{"fields":{"value":{"presentation_type":"text","value_type":"custom_string","value":"text 6 here"},"label":{"presentation_type":"text","value_type":"custom_string","value":"label 6 here"}}}}},"add_widget_preview":{"layout":"add_widget_preview_hero","components":{"hero_image":{"fields":{"image":{"presentation_type":"image","value_type":"data","value":"change this to an image"}}}}}}}})
await api.post({url: `/applications/${appId}/widget-configs/${configId}/publish`})

console.log("[Widget Creator] Adding the widget to profile...")
await api.patch({url: `/applications/${appId}`, body: {redirect_uris: ["https://discord.com"]}})
await api.post({url: `/oauth2/authorize?client_id=${appId}&response_type=token&scope=sdk.social_layer_presence`, body: {authorize: true}})
const profileRes = await api.get({url: `/users/${userId}/profile`})
const existingWidgets = profileRes.body.widgets ?? []
existingWidgets.unshift({"data":{"type":"application","application_id":appId}})
try {
	await api.put({url: `/users/@me/widgets`, body: {"widgets": existingWidgets}})
} catch(ex) {
	await api.put({url: `/users/@me/widgets`, body: {"widgets": [{"data":{"type":"application","application_id":appId}}]}})
}

console.log("[Widget Creator] Getting the bot's token... Please enter your 2FA if prompted")
const botTokenRes = await api.post({url: `/applications/${appId}/bot/reset`})
const botToken = botTokenRes.body.token

if(navigator.userAgentData?.platform === "Windows" || navigator.userAgent.includes("Windows")) {
	globalCopy(`Invoke-RestMethod -Method PATCH -Headers @{"Content-Type"="application/json"; "Authorization"="Bot ${botToken}";"User-Agent"="DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)"} -Uri https://discord.com/api/v9/applications/${appId}/users/${userId}/identities/0/profile -Body '${JSON.stringify({data: {dynamic: []}})}'`)
} else {
	globalCopy(`curl -X PATCH "https://discord.com/api/v9/applications/${appId}/users/${userId}/identities/0/profile" -H "Content-Type: application/json" -H "Authorization: Bot ${botToken}" -H "User-Agent: DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)" -d '${JSON.stringify({data: {dynamic: []}})}'`)
}
console.log("[Widget Creator] A command has been copied to your clipboard. Paste it in your pc's terminal and hit enter.")

ApexStore.createOverride("2026-03-widget-config-editor", 1)
document.querySelector(`a[href="/developers/applications/${appId}"]`).click()
while(!document.querySelector(`a[href="/developers/applications/${appId}/widget"]`)) {
    await sleep(100)
}
document.querySelector(`a[href="/developers/applications/${appId}/widget"]`).click()
console.log("[Widget Creator] Afterwards, you can edit your widget on this page!")
