# Flask API Project
> 資料庫採用 Cloud Firestore | Firebase

## 目錄結構
```
   |
   |___<你的任何APP>
   |     |
   |     |___ <__init__.py>
   |     |
   |     |___ <model.py>
   |     |
   |     |___ <route.py>
   |     |
   |     |___ <service.py>
   |
   |___<base.py>
   |
   |___<settings.py>
   |
   |___<wsgi.py>
```

## 說明

### 根目錄下

base.py 存放與Firestore溝通的Model，提供一些基本的方法如get save等等

settings.py 設定目前有哪些APP需要被載入

wsgi.py 整個程式的進入點，可以在這邊調整以什麼模式啟動Server

### 任何APP目錄下

`__init__.py` 可以設定url前綴

model.py 設定Model有什麼欄位

route.py 設定路由

service.py 處理邏輯

---

在這個範例中為基本的User CRUD(增修改查)，所以在Model定義了User物件，並有四個欄位。
```python
name = email = username = password = None
```

Route則定義如下
```python
app.add_url_rule('/', 'list', service.list)
app.add_url_rule('/', 'create', service.create, methods=['POST'])
app.add_url_rule('/<id>', 'search', service.search)
app.add_url_rule('/<id>', 'update', service.update, methods=['PATCH', 'PUT'])
app.add_url_rule('/<id>', 'delete', service.delete, methods=['DELETE'])
```

透過特定的URL去執行特定的方法(在service.py檔案內)。

在範例中url前綴為/users(定義在`__init__.py`檔案中)

---
## 輸入輸出格式

### 1.顯示所有使用者(service.list) => `'/users/'`
Http Method => GET

其中 `reference_id` 由 firestore 自動產生
```json
[
    {
        "reference_id": {
            "email": "xxx@gmail.com",
            "name": "admin",
            "password": "a",
            "username": "admin"
        }
    },
    {
        "reference_id": {
            "email": "yyy@gmail.com",
            "name": "tom",
            "password": "b",
            "username": "tom"
        }
    },
    {
        "reference_id": {
            "email": "zzz@gmail.com",
            "name": "test",
            "password": "test",
            "username": "tt"
        }
    }
]
```

### 2.建立使用者(service.create) => `'/users/'`
Http Method => POST

輸入資料
```json
{
	"name": "admin",
	"email": "xxx@gmail.com",
	"username": "admin",
	"password": "aaa"
}
```

輸出資料
```json
{
    "data": "gRMIy7qdzXHMcZgRQvlE",
    "message": "",
    "success": true
}
```

### 3.查找特定使用者(service.search) => `'/users/<id>'`
Http Method => GET

有找到(如 gRMIy7qdzXHMcZgRQvlE)

Http Code => 200
```json
{
    "data": {
        "email": "xxx@gmail.com",
        "name": "admin",
        "password": "abcabc",
        "username": "admin"
    },
    "message": "",
    "success": true
}
```
沒找到(如 1234)

Http Code => 404
```json
{
    "data": "",
    "message": "User Not Found",
    "success": true
}
```

### 4. 修改使用者資料(service.update) => `'/users/<id>'`
Http Method => PUT or PATCH

這裡傳入的資料與建立使用者相同，但PUT會將整個資料蓋過去，而PATCH只更新有傳入的資料欄位，回傳的格式則與查找使用者相同。

### 5. 刪除使用者(service.delete) => `'/users/<id>'`
Http Method => DELETE

若失敗回傳404(與查找使用者相同)，若成功回傳204。