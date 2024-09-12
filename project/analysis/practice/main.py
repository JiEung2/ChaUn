from typing import Any, List, Union

from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    name : str
    description : Union[str, None] = None
    price : float
    tags : List[str] = []


app = FastAPI()


items = [
    {"name" : 'Plumber', "price" : 33.6},
    {"name" : 'StarGun', "price" : 40.2}
]

@app.post('/item/', response_model=Item)
async def create_item(item: Item) -> Any:
    global items
    items.append(item)

    return item

@app.get("/items/", response_model=List[Item])
async def read_items() -> Any:
    global items

    return items
