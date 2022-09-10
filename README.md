<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://phatphamm-cv.surge.sh/user.jpg" alt="Markdownify" width="200"></a>
  <br>
  FE Coding Challenge
  <br>
</h1>

<h4 align="center">FE Coding Challenge (Vite, React-TS, Tailwind).</h4>

<p align="center">
    <span>Infomation</span>
    <br>
  <a href="https://fe-coding-challenge.vercel.app/">🎮 Link Demo</a> • <a href="https://phatphamm-cv.vercel.app/">💎 Link CV</a> • <a href="https://www.facebook.com/rinongusi/"> 💛 Link Facebook</a>
</p>
</p>

<div align="center">
  <a href="http://localhost:2804/admin/631aea49e14efdfaacfa14e0">
    <img src="https://phatphamm-cv.surge.sh/demo-1.png" alt="Logo" width="80%">
  </a>
  <h3 align="center"><b>Preview Edit</b></h3>
  <p align="center">--------------------------------------</p>
  <a href="http://localhost:2804/consumner/631aea49e14efdfaacfa14e0">
    <img src="https://phatphamm-cv.surge.sh/demo-2.png" alt="Logo" width="80%">
  </a>
   <h3 align="center"><b>Preview View</b></h3>
  <p align="center">--------------------------------------</p>
</div>

## Roadmap

- [x] Save
- [x] Import file, Export file
- [x] Redo, undo
- [x] Element
  - [x] Paragraph
  - [x] Button
  - [x] Image
  - [x] List
  - [x] Flex Layout
  - [ ] Grid layout
- [x] Edit Element
  - [x] Basic information
  - [x] Style
- [x] List page

## Use Design Pattern

- Factory Method
- Adapter
- Observer
- Command
- ....

## Object JSON

```json
[
  {
    "id": "406a18b6-e347-418d-a006-a50a5a1f8262",
    "style": {},
    "type": "flexLayout",
    "children": [
      "7bf53e1a-467e-4c53-a1af-1f6ce0a5f3b9",
      "c248d492-fee2-4ef5-96e7-87129aecd889",
      "7f96f472-3a68-4ce4-8ebf-3db683605403"
    ],
    "width": "",
    "height": "400px",
    "alignItems": "unset",
    "flexDirection": "unset",
    "justifyContent": "space-evenly",
    "padding": "4px",
    "margin": "",
    "gap": "",
    "background": "",
    "borderRadius": "",
    "boxShadow": ""
  },
  {
    "id": "7bf53e1a-467e-4c53-a1af-1f6ce0a5f3b9",
    "style": {},
    "type": "flexLayout",
    "children": [
      "342ad164-2a8b-40fc-85b9-502c6eb3ef91",
      "4366538b-fc89-468f-81db-78f14250832e",
      "8a077552-0739-49c5-9941-d866ca4e03ee"
    ],
    "width": "300px",
    "height": "",
    "alignItems": "unset",
    "flexDirection": "column",
    "justifyContent": "unset",
    "padding": "4px",
    "margin": "",
    "gap": "",
    "background": "yellow",
    "borderRadius": "10px",
    "boxShadow": "",
    "root": "406a18b6-e347-418d-a006-a50a5a1f8262"
  },
  ...
```

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/phatphamm01/fe-coding-challenge.git

# Go into the repository
$ cd fe-coding-challenge

# Install dependencies
$ yarn install

# Run the app
$ yarn dev
```
