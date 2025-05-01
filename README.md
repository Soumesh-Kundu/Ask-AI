# Ask AI  
##### API endpoint
```bash
/ask-ai?pipeline=
```
**Body** 
```
{
    "tasks":["summerize","extract-keywords","sentiment-analysis","complete"|"translate-to-<lang>"] 
    //any combination of the above will a valid task passed as array will be executed in order
    "content": "string" //content to be processed
}
```
**Query Parameters**
```
{
    "pipeline": "true"  //(default false) 
    // if true, the each stage response will be returned in the response
}
```

**Sample Request**
url: /ask-ai
body: 
```
{
    "tasks":["summerize",
        "extract-keywords"
    ],
    "content":"The rapid advancement of artificial intelligence is transforming industries across the globe. From healthcare and education to transportation and entertainment, AI technologies are streamlining operations, improving decision-making, and enhancing user experiences. However, with these innovations come important ethical considerations, including data privacy, algorithmic bias, and the future of employment. As we move forward, it's crucial to ensure that AI development remains transparent, inclusive, and aligned with societal values."
}
```

**Response**
```
{
    {
    "tasks": [
        "summerize",
        "extract-keywords"
    ],
    "content": "The rapid advancement of artificial intelligence is transforming industries across the globe. From healthcare and education to transportation and entertainment, AI technologies are streamlining operations, improving decision-making, and enhancing user experiences. However, with these innovations come important ethical considerations, including data privacy, algorithmic bias, and the future of employment. As we move forward, it's crucial to ensure that AI development remains transparent, inclusive, and aligned with societal values.",
    "response": "artificial intelligence, industries, ethical considerations, data privacy, algorithmic bias, future of employment, transparent, inclusive, societal values"
}
}
```

**Response with Pipeline**
url: /ask-ai?pipeline=true
body: Same body as above
```
{
    "tasks": [
        "summerize",
        "extract-keywords"
    ],
    "content": "The rapid advancement of artificial intelligence is transforming industries across the globe. From healthcare and education to transportation and entertainment, AI technologies are streamlining operations, improving decision-making, and enhancing user experiences. However, with these innovations come important ethical considerations, including data privacy, algorithmic bias, and the future of employment. As we move forward, it's crucial to ensure that AI development remains transparent, inclusive, and aligned with societal values.",
    "response": "artificial intelligence, industries, ethical considerations, data privacy, algorithmic bias, future of employment, transparent, inclusive, societal values",
    "pipeline": [
        {
            "summerize": "AI is transforming industries, streamlining operations, improving decision-making, and enhancing user experiences. Ethical considerations, including data privacy, algorithmic bias, and the future of employment, are crucial. AI development should remain transparent, inclusive, and aligned with societal values."
        },
        {
            "extract-keywords": "artificial intelligence, industries, ethical considerations, data privacy, algorithmic bias, future of employment, transparent, inclusive, societal values"
        }
    ]
}

```


tasks sample
```
{
    "tasks": ["summerize","translate-to-zh" | "translate-to-chinese"]
    //for translation can be any of the above two is accepted

    //for example
    "tasks":["summerize","extract-keywords","translate-to-bengali"]
}
```