const rules = [
    //Image  ![This is a alt text.](/image/logo.png "This is a sample image.")
    [
      /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/
      ,`<img src="$1" alt="$2" width="120px" height="100px"/>`
    ],

    //header rules
    [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
    [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
    [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
    [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
    [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
    [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
    //bold, italics and paragragh rules
    [/\*\s?([^\n]+)\*/g, "<b>$1</b>"],
    [/_\s?([^\n]+)_/g, "<i>$1</i>"],
    [/__([^_]+)__/g, "<b>$1</b>"],
    [/_([^_`]+)_/g, "<i>$1</i>"],
    [/([^\n]+\n?)/g, "<div>$1</div>"],


    //links
    [
       /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:#2A5DB0 ;text-decoration: none;">$1</a>',
    ],
    //highlights
    [
      /(`)(\s?[^\n,]+\s?)(`)/g,
      '<a style="background-color:lightgrey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</a>',
    ],
    // [
    //   /(```sh\n)(([^`]+)\s?\n)(```)/g,
    //   '<a style="background-color:grey;color:black;text-decoration: none;margin-left:5%">$3<br></a>',
    // ],
  
    //Table
    [/((\n\d\..+)+)/g, '<ol style="margin-left:0%">$1</ol>'],
    [/((\n\*.+)+)/g, "<ul>$1</ul>"],
    // [/\n\d\.([^\n]+)/g, "<li>$1</li>"],
    [/\n\*([^\n]+)/g, "<li>$1</li>"],
  
    [/([^\n]+)\n\s+=+/g, "<h1>$1</h1><hr />"],
    [/([^\n]+)\n\s+-+/g, "<h2>$1</h2><hr />"],
  
  ];
  const updateDom = function(el, value)
  {
    let html = value;
    rules.forEach(([rule, template]) => {
        html= html.replace(rule, template)
    })
    el.innerHTML = html;
  }
  export const vMarkdown={
    beforeMount: (el) => {
      updateDom(el, el.textContent)
      },
    beforeUpdate: (el, binding) => {
      updateDom(el, binding.value)
      },
  }