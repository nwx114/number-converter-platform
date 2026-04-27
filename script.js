// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
	// 导航栏功能
	const mobileMenu = document.getElementById('mobileMenu');
	const navLinks = document.querySelector('.nav-links');
	const logo = document.getElementById('logo');

	// Logo点击返回主页并显示二维码
	logo.addEventListener('click', function() {
		const convertModule = document.getElementById('convertModule');
		const videoModule = document.getElementById('videoModule');
		const contentSections = document.querySelectorAll('.content-section');
		const homeContent = document.getElementById('homeContent');

		convertModule.style.display = 'none';
		videoModule.style.display = 'none';
		contentSections.forEach(section => section.classList.remove('active'));
		homeContent.style.display = 'block';

		window.scrollTo({ top: 0, behavior: 'smooth' });

		const wechatQr = document.getElementById('wechatQr');
		if(wechatQr) wechatQr.style.display = 'block';
	});

	mobileMenu.addEventListener('click', function() {
		navLinks.classList.toggle('active');
	});

	// 功能模块切换
	const convertBtn = document.getElementById('convertBtn');
	const videoBtn = document.getElementById('videoBtn');
	const convertModule = document.getElementById('convertModule');
	const videoModule = document.getElementById('videoModule');
	const contentSections = document.querySelectorAll('.content-section');
	const homeContent = document.getElementById('homeContent');

	convertBtn.addEventListener('click', function() {
		contentSections.forEach(s => s.classList.remove('active'));
		videoModule.style.display = 'none';
		homeContent.style.display = 'none';
		convertModule.style.display = 'block';
		convertModule.scrollIntoView({ behavior: 'smooth' });
	});

	videoBtn.addEventListener('click', function() {
		contentSections.forEach(s => s.classList.remove('active'));
		convertModule.style.display = 'none';
		homeContent.style.display = 'none';
		videoModule.style.display = 'block';
		videoModule.scrollIntoView({ behavior: 'smooth' });
	});

	// 导航链接点击事件
	function handleAnchorClick(e) {
		e.preventDefault();
		convertModule.style.display = 'none';
		videoModule.style.display = 'none';
		homeContent.style.display = 'none';
		contentSections.forEach(s => s.classList.remove('active'));
		const targetId = this.getAttribute('href').substring(1);
		const targetSection = document.getElementById(targetId);
		if(targetSection) {
			targetSection.classList.add('active');
			window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
		}
		navLinks.classList.remove('active');
	}

	const navAnchorLinks = document.querySelectorAll('.nav-links a');
	navAnchorLinks.forEach(link => {
		if(link.classList.contains('dropbtn')) {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				convertModule.style.display = 'none';
				videoModule.style.display = 'none';
				contentSections.forEach(s => s.classList.remove('active'));
				homeContent.style.display = 'block';
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
		} else {
			link.addEventListener('click', handleAnchorClick);
		}
	});

	const footerAnchorLinks = document.querySelectorAll('.footer-section a');
	footerAnchorLinks.forEach(link => {
		if(link.id === 'footerConvertLink') {
			link.addEventListener('click', e => {
				e.preventDefault();
				contentSections.forEach(s => s.classList.remove('active'));
				videoModule.style.display = 'none';
				homeContent.style.display = 'none';
				convertModule.style.display = 'block';
				convertModule.scrollIntoView({ behavior: 'smooth' });
			});
		} else if(link.id === 'footerVideoLink') {
			link.addEventListener('click', e => {
				e.preventDefault();
				contentSections.forEach(s => s.classList.remove('active'));
				convertModule.style.display = 'none';
				homeContent.style.display = 'none';
				videoModule.style.display = 'block';
				videoModule.scrollIntoView({ behavior: 'smooth' });
			});
		} else if(link.id === 'footerTestLink') {
			link.addEventListener('click', e => {
				e.preventDefault();
				const wechatQr = document.getElementById('wechatQr');
				if(wechatQr) wechatQr.style.display = 'block';
			});
		} else {
			link.addEventListener('click', handleAnchorClick);
		}
	});

	// 进制转换功能
	const decimalInput = document.getElementById('decimalInput');
	const binaryInput = document.getElementById('binaryInput');
	const decimalSteps = document.getElementById('decimalSteps');
	const decimalFinal = document.getElementById('decimalFinal');
	const binarySteps = document.getElementById('binarySteps');
	const binaryFinal = document.getElementById('binaryFinal');

	if(decimalInput) {
		decimalInput.addEventListener('input', function() {
			const decimal = parseInt(this.value);
			if(isNaN(decimal) || decimal < 0) {
				decimalSteps.textContent = '';
				decimalFinal.textContent = '请输入非负整数';
				return;
			}
			let steps = '';
			let num = decimal;
			let binary = '';
			if(num === 0) {
				binary = '0';
				steps = '0 ÷ 2 = 0 余 0';
			} else {
				while(num > 0) {
					const rem = num % 2;
					const q = Math.floor(num / 2);
					steps += `${num} ÷ 2 = ${q} 余 ${rem}\n`;
					binary = rem + binary;
					num = q;
				}
			}
			decimalSteps.textContent = steps;
			decimalFinal.textContent = `二进制结果：${binary}`;
		});
	}

	if(binaryInput) {
		binaryInput.addEventListener('input', function() {
			const binary = this.value;
			if(!/^[01]+$/.test(binary)) {
				binarySteps.textContent = '';
				binaryFinal.textContent = '';
				return;
			}
			let steps = '';
			let decimal = 0;
			for(let i=0; i<binary.length; i++) {
				const d = parseInt(binary[binary.length-1-i]);
				const w = Math.pow(2,i);
				steps += `${d} × 2^${i} = ${d*w}\n`;
				decimal += d*w;
			}
			binarySteps.textContent = steps;
			binaryFinal.textContent = `十进制结果：${decimal}`;
		});
	}

	// 多进制转换
	const multiDecimalInput = document.getElementById('multiDecimalInput');
	const multiBinaryInput = document.getElementById('multiBinaryInput');
	const multiOctalInput = document.getElementById('multiOctalInput');
	const multiHexInput = document.getElementById('multiHexInput');
	const finalResults = document.getElementById('finalResults');

	function convertNumber(v, b) {
		const n = parseInt(v, b);
		if(isNaN(n) || n<0) return null;
		return {
			decimal: n.toString(10),
			binary: n.toString(2),
			octal: n.toString(8),
			hex: n.toString(16).toUpperCase()
		};
	}

	function validateInput(v, b) {
		if(!v) return true;
		switch(b) {
			case 10: return /^\d+$/.test(v);
			case 2: return /^[01]+$/.test(v);
			case 8: return /^[0-7]+$/.test(v);
			case 16: return /^[0-9A-Fa-f]+$/.test(v);
			default: return false;
		}
	}

	function updateResults(r) {
		if(!r) { finalResults.innerHTML=''; return; }
		finalResults.innerHTML = `
			<div class="result-item"><h5>十进制</h5><p>${r.decimal}</p></div>
			<div class="result-item"><h5>二进制</h5><p>${r.binary}</p></div>
			<div class="result-item"><h5>八进制</h5><p>${r.octal}</p></div>
			<div class="result-item"><h5>十六进制</h5><p>${r.hex}</p></div>
		`;
	}

	function handleInput(base) {
		return function() {
			const v = this.value;
			if(!validateInput(v, base)) { updateResults(null); return; }
			if(!v) { updateResults(null); return; }
			const r = convertNumber(v, base);
			if(r) {
				multiDecimalInput.value = r.decimal;
				multiBinaryInput.value = r.binary;
				multiOctalInput.value = r.octal;
				multiHexInput.value = r.hex;
				updateResults(r);
			} else updateResults(null);
		};
	}

	if(multiDecimalInput) multiDecimalInput.addEventListener('input', handleInput(10));
	if(multiBinaryInput) multiBinaryInput.addEventListener('input', handleInput(2));
	if(multiOctalInput) multiOctalInput.addEventListener('input', handleInput(8));
	if(multiHexInput) multiHexInput.addEventListener('input', handleInput(16));

	// 微信二维码
	const wechatLink = document.getElementById('wechatLink');
	const wechatQr = document.getElementById('wechatQr');

	if(wechatLink && wechatQr) {
		wechatLink.addEventListener('click', e => {
			e.preventDefault();
			homeContent.style.display = 'block';
			convertModule.style.display = 'none';
			videoModule.style.display = 'none';
			contentSections.forEach(s => s.classList.remove('active'));
			wechatQr.style.display = wechatQr.style.display === 'block' ? 'none' : 'block';
		});
	}

	document.addEventListener('click', e => {
		if(wechatQr && wechatLink && !wechatLink.contains(e.target) && !wechatQr.contains(e.target)) {
			wechatQr.style.display = 'none';
		}
	});

	// 隐私政策弹窗
	const privacyModal = document.getElementById('privacyModal');
	const termsModal = document.getElementById('termsModal');
	const privacyLink = document.getElementById('privacyLink');
	const termsLink = document.getElementById('termsLink');
	const closeBtns = document.querySelectorAll('.modal .close');

	if(privacyLink) privacyLink.addEventListener('click', e => { e.preventDefault(); privacyModal.style.display = 'block'; });
	if(termsLink) termsLink.addEventListener('click', e => { e.preventDefault(); termsModal.style.display = 'block'; });

	closeBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const modal = btn.closest('.modal');
			if(modal) modal.style.display = 'none';
		});
	});

	window.addEventListener('click', e => {
		if(e.target === privacyModal) privacyModal.style.display = 'none';
		if(e.target === termsModal) termsModal.style.display = 'none';
	});

	// 快速转换
	const quickDecimalInput = document.getElementById('quickDecimalInput');
	const quickBinaryInput = document.getElementById('quickBinaryInput');
	const quickDecimalResult = document.getElementById('quickDecimalResult');
	const quickBinaryResult = document.getElementById('quickBinaryResult');

	if(quickDecimalInput) {
		quickDecimalInput.addEventListener('input', function() {
			const d = parseInt(this.value);
			if(isNaN(d) || d < 0) {
				if(this.value) { quickDecimalResult.textContent = '请输入非负整数'; quickDecimalResult.className = 'quick-result error'; }
				else { quickDecimalResult.textContent = ''; quickDecimalResult.className = 'quick-result'; }
				return;
			}
			let b = ''; let n = d;
			if(n===0) b='0'; else while(n>0) { b = n%2 + b; n = Math.floor(n/2); }
			quickDecimalResult.textContent = `二进制结果：${b}`;
			quickDecimalResult.className = 'quick-result success';
		});
	}

	if(quickBinaryInput) {
		quickBinaryInput.addEventListener('input', function() {
			const b = this.value;
			if(!/^[01]+$/.test(b)) {
				if(b) { quickBinaryResult.textContent = '请输入二进制数'; quickBinaryResult.className = 'quick-result error'; }
				else { quickBinaryResult.textContent = ''; quickBinaryResult.className = 'quick-result'; }
				return;
			}
			let d=0;
			for(let i=0; i<b.length; i++) d += parseInt(b[b.length-1-i]) * Math.pow(2,i);
			quickBinaryResult.textContent = `十进制结果：${d}`;
			quickBinaryResult.className = 'quick-result success';
		});
	}

	// 微课按钮
	document.querySelectorAll('.watch-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			contentSections.forEach(s => s.classList.remove('active'));
			convertModule.style.display = 'none';
			homeContent.style.display = 'none';
			videoModule.style.display = 'block';
			videoModule.scrollIntoView({ behavior: 'smooth' });
		});
	});

	// 优势卡片
	const visualConvertCard = document.getElementById('visualConvertCard');
	const microCourseCard = document.getElementById('microCourseCard');
	const multiConvertCard = document.querySelector('.advantage-card:nth-child(2)');

	if(visualConvertCard) visualConvertCard.addEventListener('click', () => {
		contentSections.forEach(s => s.classList.remove('active'));
		videoModule.style.display = 'none'; homeContent.style.display = 'none';
		convertModule.style.display = 'block';
		convertModule.scrollIntoView({ behavior: 'smooth' });
	});
	if(microCourseCard) microCourseCard.addEventListener('click', () => {
		contentSections.forEach(s => s.classList.remove('active'));
		convertModule.style.display = 'none'; homeContent.style.display = 'none';
		videoModule.style.display = 'block';
		videoModule.scrollIntoView({ behavior: 'smooth' });
	});
	if(multiConvertCard) multiConvertCard.addEventListener('click', () => {
		contentSections.forEach(s => s.classList.remove('active'));
		videoModule.style.display = 'none'; homeContent.style.display = 'none';
		convertModule.style.display = 'block';
		convertModule.scrollIntoView({ behavior: 'smooth' });
	});

	const fullToolLink = document.getElementById('fullToolLink');
	if(fullToolLink) fullToolLink.addEventListener('click', e => {
		e.preventDefault();
		contentSections.forEach(s => s.classList.remove('active'));
		videoModule.style.display = 'none'; homeContent.style.display = 'none';
		convertModule.style.display = 'block';
		convertModule.scrollIntoView({ behavior: 'smooth' });
	});

	// ==========================
	// AI 聊天功能（已修复！）
	// ==========================
	const DEEPSEEK_API_KEY = "sk-21d2cdc0e476414ab631fb3ff0efec67";

	const humanImage = document.getElementById("peoplepic");
	const aiChatContent = document.getElementById("content");
	const aiChatInput = document.getElementById("aichatinput");
	const aiChatSend = document.getElementById("sendb");
	const aiAvatar = document.getElementById("aipeople");
	const aiChatWindow = document.getElementById("aichat");
	const aiChatClose = document.getElementById("close");
	const voiceBtn = document.getElementById("voiceb");

	// 点击数字人显示/隐藏窗口
	aiAvatar.onclick = () => {
		aiChatWindow.classList.toggle("active");
	};

	aiChatClose.onclick = () => {
		aiChatWindow.classList.remove("active");
	};

	// 说话动画
	function speak(text) {
		const originalSrc = humanImage.src;

    // ✅ 设置为你的说话动图（这里换成你的动图路径）
        humanImage.src = "pictures/4月27日.gif";

        const s = new SpeechSynthesisUtterance();
        s.text = text;
        s.lang = "zh-CN";
        s.rate = 1.1;
        window.speechSynthesis.speak(s);

    // 说话结束 → 切回原图
        s.onend = () => {
            humanImage.src = originalSrc;
        };
    // 出错也切回
        s.onerror = () => {
            humanImage.src = originalSrc;
        };
	}

	// AI 请求
	async function getAIResponse(msg) {
		const message = msg.trim();
		if (!message) return "请输入要提问的内容！";
		if(!DEEPSEEK_API_KEY) return "请配置API Key";
		try {
			const res = await fetch("http://localhost:3000/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: message })
			});
			const data = await res.json();
			 return data.answer || "抱歉，我没理解你的问题";
		} catch(e) {
			console.error(e);
			return "AI服务暂时不可用";
		}
	}

	// 发送消息
	async function sendMessage() {
		const t = aiChatInput.value.trim();
		if(!t) return;
		aiChatContent.innerHTML += `<div class='user-message'>${t}</div>`;
		aiChatInput.value = "";
		aiChatContent.scrollTop = aiChatContent.scrollHeight;
		const r = await getAIResponse(t);
		aiChatContent.innerHTML += `<div class='ai-message'>${r}</div>`;
		aiChatContent.scrollTop = aiChatContent.scrollHeight;
		speak(r);
	}

	aiChatSend.onclick = sendMessage;
	aiChatInput.addEventListener("keypress", e => {
		if(e.key === "Enter") sendMessage();
	});

	// ✅ 语音输入（已修复！）
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	if (SpeechRecognition) {
		const recog = new SpeechRecognition();
		recog.lang = "zh-CN";
		recog.continuous = false;
		recog.interimResults = false;

		voiceBtn.onclick = () => {
			recog.start();
			voiceBtn.textContent = "🎙️ 聆听中...";
		};

		recog.onresult = (e) => {
			const text = e.results[0][0].transcript;
			aiChatInput.value = text;
			sendMessage();
			voiceBtn.textContent = "🎤";
		};

		recog.onend = () => {
			voiceBtn.textContent = "🎤";
		};

		recog.onerror = (e) => {
			console.error("语音错误：", e.error);
			alert("语音识别失败：" + e.error);
			voiceBtn.textContent = "🎤";
		};
	} else {
		voiceBtn.onclick = () => {
			alert("你的浏览器不支持语音输入，请使用 Chrome / Edge");
		};
	}

});