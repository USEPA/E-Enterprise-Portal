Overview
Views JSON Query is a Views 3 plugin that adds native JSON query generation. 
It allows you to parse JSON using Views' graphical query builder.
It works much like Views XML Backend but with JSON.

How it works
When creating a new view choose "Json" on "Show" field.
Then when editing the view, click Settings on Query settings, choose the source 
of the Json data, define the row apath and you're done.
Now just add one or more fields and set the key value of the field you want to 
show.

Example
A file called nodes.json that is hosted on www.example.com with the 
following structure:
{
  "nodes": [
    {
      "nid": 1,
      "title": "Views JSON QUery",
      "description": "A quite handy module."
    }, 
    {
      "nid": 2,
      "title": "Views XML Backend",
      "description", "Luke, I'm your father."
    }
  ]
}

Query settings:
  Json File: http://www.example.com/nodes.json
  Row Apath: nodes

Hope you find this module useful.
