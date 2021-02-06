# Favorites management

Using channels response from `channels.json` implement favorites management UI
similar to this [example](https://zattoo-abox-master.zattoo.com/?login=00007733&password=54321). Please note that app supports only keyboard navigation.
You can access favorites management following steps below:
1. Close all UI dialogs with ESC key
2. Open Menu (press Left arrow key) -> Settings -> Manage favorites

You should also set you screen size to 1280x720 via Chrome dev tools to see the proper UI.

results of your work please share via private GitHub repo (my GitHub username pverkhovskyi)



## Requirements
- filter duplicated channels from the response
- use best available quality (`uhd` > `hd` > `sd`)
- only channels with availability === available should be in the list
- render all channels in two columns
- Each rendered channel item should have number, logo, title, quality and display inFavorites status
- enable keyboard navigation
- highlight selected item
- on Enter key add item to favorites list / or remove when it is already in the list

Try to match UI as close as possible (this will help us evaluate how you can follow specs provided by the design team, of course in real project designs are handed over differently via https://www.abstract.com/)

Optimise your task results for runtime performance.

Please use tools / frameworks / libraries you are the most experience with.


## Hints
To get channel logo use `logo_token` from the response (example `https://images.zattic.com/logos/93b42a0d35defc25ca42/white/240x135.png`)
