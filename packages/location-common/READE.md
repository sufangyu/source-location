# @yu/location-common
UI视图定位源代码的公共能力提供


## 具体能力介绍

### codeLineTrack
每行代码埋数据，参数说明：
- `code`：文件内容
- `path`：文件路径


### openEditor
打开 IED 编辑器，参数说明：
- `req`：api 请求信息. 获取请求信息
- `editorType`：编辑器类型，默认是 vscode. 支持 vscode、webstrom
