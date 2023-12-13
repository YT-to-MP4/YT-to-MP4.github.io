// npm install ytdl-core

const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/download', async (req, res) => {
  const youtubeURL = req.query.url;

  try {
    const info = await ytdl.getInfo(youtubeURL);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    ytdl(youtubeURL, { format: videoFormat })
      .pipe(res);
  } catch (err) {
    res.send('Error: Invalid YouTube URL or unable to fetch the video.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
