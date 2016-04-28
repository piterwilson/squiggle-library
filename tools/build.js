{
    "baseUrl": "../lib",
    "paths": {
        "squiggle": "../squiggle"
    },
    "include": ["../tools/almond", "squiggle"],
    "exclude": ["jquery", "underscore", "backbone", "p5"],
    "out": "../examples/lib/squiggle.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    },
    preserveLicenseComments: false
}
