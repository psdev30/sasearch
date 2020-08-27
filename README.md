# SASearch
SASearch is a clip searcher of the popular sports personality Stephen A. Smith's (SAS) best reactions

## Why I made it
Tbh, it's pretty much useless—but if you know anything about Stephen A. Smith, it's that he's hilarious, flamboyant, & a meme machine, so opportunities frequently arise in which I could respond to someone w/ a SAS meme or short clip. Unfortunately, the SAS folder on my phone is much too large at this point, so it's kinda hard to find what I'm looking for without some serious scrolling 

## Installation
Just go to https://sasearch3011.web.app

## Usage
- The "I'm Feeling Lucky" button works similarly to Google's—clicking it displays a random video 
- Unless you're a SAS superfan or frequent NBA Twitter, you probably don't have much of a clue about what you could look up, so here are some example searches:
    * we don't care (my favorite)
    * amazed
    * who is this
    * stop lying
    * look it wasn't me

## How it works
- Backend is deployed on Heroku & frontend is hosted on Firebase

- The metadata for each video is stored in a PostgreSQL database table & the media files themselves are hosted in the cloud utilizing Cloudinary

- Flow of application: API call from UI &#8594; API endpoint retrieves IDs of relevant clips from database + Cloudinary & sends back to frontend &#8594; IDs are fed as src attribute to video player


## Code Snippets
Extracts & returns relevant info out of .wav file:
```python
def extract_text(wav, file_name):
    r = sr.Recognizer()
    with sr.WavFile(os.path.abspath(wav)) as source:
        try:
            audio = r.record(source)
            text = r.recognize_google(audio)
            name = file_name.title()
            if '_' in file_name:
                name = name.replace('_', ' ')
            short_path = file_name + '.mp4'
            os.remove('clips_library/' + file_name + '.mp3')
            os.remove('clips_library/' + file_name + '.wav')
            return name, short_path, text

        except:
            os.remove('clips_library/' + file_name + '.mp4')
            os.remove('clips_library/' + file_name + '.mp3')
            os.remove('clips_library/' + file_name + '.wav')
            return 'clip audio is unreadable'
```


Making search call + extracting result IDs from response:
```typescript
this.loading = true;
this.query = this.route.snapshot.paramMap.get('query');
this.flaskService.search(this.query).subscribe((resp) => {
    let respLength: number = Object.keys(resp).length;
    if (respLength == 0) {
        this.openSnackBar(this.query, 'Close');
    }

    for (let i = 0; i < respLength; i++) {
        this.publicIds.push(resp[i]);
    }

    this.searchClicked = true;
    this.transfer.resetQuery();
    this.loading = false;
});
 ```

## What I'm working on now
- Making it Android compatible (\*technically* it works on Android, but it looks terrible and needs you to use the browser, so making a mobile version will be better) 
- Figuring out buildpack/compatibility issues w/ Selenium + Chrome Webdriver not working on Heroku (so I can add clips automatically to the pool instead of manually having to add each one)

## What's after ^^
- Create a custom matching algorithm to get more accurate search results
- Add a more advanced caching mechanism
    * right now it has local caching, but as soon as you reload the page the cache clears

## Acknowledgements
Credit to [@SASBurnerAcct](https://twitter.com/SASBurnerAcct) and NBA Twitter as a whole for most of the SAS clips I have

## Complaints
If you have any issues w/ SAS—well, I'll just let him show you how I feel

![SAS](SAS.jpg)