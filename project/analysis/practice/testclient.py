from fastapi.testclient import TestClient
from .mongo_test import app

client = TestClient(app)

'''
이제 세가지 API 함수에 대해 테스트하는 함수들을 작성하겠습니다.

test_root(): “root“ API 함수에 대해 GET 방식으로 요청하여 테스트하는 함수 입니다.

test_read_item(): “read_item“ API 함수에 대해 item_id가 1인 item을 params 값에 추가하여 GET 방식으로 요청하여 테스트하는 함수 입니다.

test_create_item(): “create_item“ API 함수에 대해 생성할 item을 json 값에 추가하여 POST 방식으로 요청하여 테스트하는 함수 입니다.
'''

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}


def test_read_item():
    response = client.get("/items/1")  # 예시 ObjectId
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "description" in data
    assert "price" in data
    assert "_id" in data


def test_create_item():
    item_data = {
        "name": "Test Item",
        "description": "A test item",
        "price": 9.99,
        "in_stock": True
    }
    response = client.post("/items/", json=item_data)
    assert response.status_code == 200
    response_data = response.json()
    assert "id" in response_data  # MongoDB ObjectId가 반환됨
    assert response_data["name"] == "Test Item"
    assert response_data["description"] == "A test item"