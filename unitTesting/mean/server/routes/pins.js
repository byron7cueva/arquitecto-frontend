var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var Pins = require('../models/Pins.js');
var requestPromise = require('request-promise-native');
var Url = require('url-parse');

/* GET ALL PINS */
router.get('/', function(req, res, next) {
  Pins.find(function(err, pins) {
    if (err) return next(err);
    res.json(pins);
  });
});

/* GET SINGLE PIN BY ID */
router.get('/:id', function(req, res, next) {
  Pins.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/** Get URL information */
function getMetadataFromAssets(assets) {
  return Promise.all(
    assets.map(async asset => {
      const regex = /^.+\.(([pP][dD][fF])|([jJ][pP][gG]))$/gm;

      if (regex.test(asset.url)) {
        const url = Url(asset.url);
        const title = url.hostname;
        const description = url.pathname;

        return Promise.resolve(`<title>PDF from: ${title} </title><meta name="description" content="${description}">`);
      } else {
        return await requestPromise.get({ url: asset.url });
      }
    })
  );
}

/* SAVE PIN */
router.post('/', function(req, res, next) {
  const _pins = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    percentage: 0,
    tags: [],
    assets: []
  };

  getMetadataFromAssets(req.body.assets)
    .then(htmls => {
      htmls.forEach((html, index) => {
        const $ = cheerio.load(html);
        const webpageTitle = $('title').text();
        const metaDescription = $('meta[name=description]').attr('content');

        _pins.assets.push({
          title: webpageTitle,
          description: metaDescription,
          readed: false,
          url: req.body.assets[index].url
        });
      });

      Pins.create(_pins, function(err, post) {
        if (err) return next(err);
        res.json(post);
      });
    })
    .catch(error => {
      next(error);
    });
});

/* UPDATE PIN */
router.put('/:id', function(req, res, next) {
  Pins.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PIN */
router.delete('/:id', function(req, res, next) {
  Pins.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = {
  router,
  getMetadataFromAssets
};
