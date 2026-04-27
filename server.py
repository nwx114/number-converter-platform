from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import traceback
import re

app = Flask(__name__)
CORS(app)

DEEPSEEK_API_KEY = "sk-21d2cdc0e476414ab631fb3ff0efec67"
# 自定义：设置回答的最大字数（可根据需求调整，比如200/300）
MAX_ANSWER_LENGTH = 200

def smart_truncate(text, max_length):
    """智能截断：保留完整语义，不是粗暴切割"""
    if len(text) <= max_length:
        return text
    
    # 先按句子分割，优先截断到完整句子末尾
    sentences = re.split(r'。|！|？|；', text)
    result = ""
    for sent in sentences:
        if len(result + sent + "。") <= max_length:
            result += sent + "。"
        else:
            break
    
    # 如果没凑够内容（比如只有1个长句），直接截断并补省略号
    if not result:
        result = text[:max_length-3] + "..."
    return result.strip()

@app.route("/ai", methods=["POST"])
def chat():
    try:
        user_message = request.json.get("message", "").strip()
        print(f"接收到前端消息：{user_message}")
        
        if not user_message:
            return jsonify(answer="请输入你的问题")

        # 调用API时，直接提示AI回答要简短
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            json={
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": f"回答必须简洁，控制在{MAX_ANSWER_LENGTH}字以内，只讲核心内容，不要多余解释和格式"},
                    {"role": "user", "content": user_message}
                ],
                "temperature": 0.7,
                "max_tokens": 500,  # 先减少API返回的基础长度
                "stream": False
            },
            headers={
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                "Content-Type": "application/json"
            },
            timeout=30
        )

        if response.status_code != 200:
            return jsonify(answer="AI服务暂时不可用")

        result = response.json()
        content = result["choices"][0]["message"]["content"]

        # 第一步：清理格式
        clean_answer = content.strip()
        clean_answer = re.sub(r'###.*?\n', '', clean_answer)  # 去掉标题
        clean_answer = re.sub(r'\|.*?\|', '', clean_answer)   # 去掉表格
        clean_answer = re.sub(r'\n{3,}', '\n\n', clean_answer) # 多余空行
        clean_answer = re.sub(r'\*+', '', clean_answer)      # 去掉**加粗**
        clean_answer = clean_answer.replace('\n', ' ')      # 换成普通空格
        clean_answer = clean_answer.strip()

        # 第二步：智能截断到指定字数
        clean_answer = smart_truncate(clean_answer, MAX_ANSWER_LENGTH)

        return jsonify(answer=clean_answer)

    except Exception as e:
        print(traceback.format_exc())
        return jsonify(answer="AI回答失败，请重试")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)