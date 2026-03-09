// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏功能
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.getElementById('logo');
    
    // Logo点击返回主页
    logo.addEventListener('click', function() {
        // 隐藏所有模块和内容区域
        const convertModule = document.getElementById('convertModule');
        const videoModule = document.getElementById('videoModule');
        const contentSections = document.querySelectorAll('.content-section');
        const homeContent = document.getElementById('homeContent');
        
        convertModule.style.display = 'none';
        videoModule.style.display = 'none';
        contentSections.forEach(section => section.classList.remove('active'));
        // 显示主页内容
        homeContent.style.display = 'block';
        
        // 滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // 登录/注册模态框
    const authModal = document.getElementById('authModal');
    const userAvatar = document.getElementById('userAvatar');
    const closeBtn = document.querySelector('.close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    userAvatar.addEventListener('click', function() {
        authModal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    
    // 标签切换
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // 移除所有标签的active类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');
            
            // 激活当前标签
            this.classList.add('active');
            document.getElementById(tab + 'Tab').style.display = 'block';
        });
    });
    
    // 表单提交
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('登录成功！');
            authModal.style.display = 'none';
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('注册成功！');
            authModal.style.display = 'none';
        });
    }
    
    // 功能模块切换
    const convertBtn = document.getElementById('convertBtn');
    const videoBtn = document.getElementById('videoBtn');
    const convertModule = document.getElementById('convertModule');
    const videoModule = document.getElementById('videoModule');
    const contentSections = document.querySelectorAll('.content-section');
    const homeContent = document.getElementById('homeContent');
    
    convertBtn.addEventListener('click', function() {
        // 隐藏所有内容区域和模块
        contentSections.forEach(section => section.classList.remove('active'));
        videoModule.style.display = 'none';
        // 隐藏主页内容
        homeContent.style.display = 'none';
        // 显示进制转换模块
        convertModule.style.display = 'block';
        // 滚动到模块顶部
        convertModule.scrollIntoView({ behavior: 'smooth' });
    });
    
    videoBtn.addEventListener('click', function() {
        // 隐藏所有内容区域和模块
        contentSections.forEach(section => section.classList.remove('active'));
        convertModule.style.display = 'none';
        // 隐藏主页内容
        homeContent.style.display = 'none';
        // 显示视频模块
        videoModule.style.display = 'block';
        // 滚动到模块顶部
        videoModule.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 导航链接点击事件
    const navAnchorLinks = document.querySelectorAll('.nav-links a');
    navAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // 隐藏所有模块
            convertModule.style.display = 'none';
            videoModule.style.display = 'none';
            // 隐藏主页内容
            homeContent.style.display = 'none';
            // 隐藏所有内容区域
            contentSections.forEach(section => section.classList.remove('active'));
            // 获取目标ID
            const targetId = this.getAttribute('href').substring(1);
            // 显示对应的内容区域
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                // 滚动到内容区域
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // 在移动端关闭菜单
            navLinks.classList.remove('active');
        });
    });
    
    // 进制转换功能
    const decimalInput = document.getElementById('decimalInput');
    const binaryInput = document.getElementById('binaryInput');
    const decimalSteps = document.getElementById('decimalSteps');
    const decimalFinal = document.getElementById('decimalFinal');
    const binarySteps = document.getElementById('binarySteps');
    const binaryFinal = document.getElementById('binaryFinal');
    
    // 十进制转二进制
    if (decimalInput) {
        decimalInput.addEventListener('input', function() {
            const decimal = parseInt(this.value);
            if (isNaN(decimal) || decimal < 0) {
                decimalSteps.textContent = '';
                decimalFinal.textContent = '请输入非负整数';
                return;
            }
            
            let steps = '';
            let num = decimal;
            let binary = '';
            
            if (num === 0) {
                binary = '0';
                steps = '0 ÷ 2 = 0 余 0';
            } else {
                while (num > 0) {
                    const remainder = num % 2;
                    const quotient = Math.floor(num / 2);
                    steps += `${num} ÷ 2 = ${quotient} 余 ${remainder}\n`;
                    binary = remainder + binary;
                    num = quotient;
                }
            }
            
            decimalSteps.textContent = steps;
            decimalFinal.textContent = `二进制结果：${binary}`;
        });
    }
    
    // 二进制转十进制
    if (binaryInput) {
        binaryInput.addEventListener('input', function() {
            const binary = this.value;
            // 验证输入是否为二进制
            if (!/^[01]+$/.test(binary)) {
                binarySteps.textContent = '';
                binaryFinal.textContent = '';
                return;
            }
            
            let steps = '';
            let decimal = 0;
            
            for (let i = 0; i < binary.length; i++) {
                const digit = parseInt(binary[binary.length - 1 - i]);
                const weight = Math.pow(2, i);
                const product = digit * weight;
                steps += `${digit} × 2^${i} = ${product}\n`;
                decimal += product;
            }
            
            binarySteps.textContent = steps;
            binaryFinal.textContent = `十进制结果：${decimal}`;
        });
    }
    
    // 多进制转换功能
    const multiDecimalInput = document.getElementById('multiDecimalInput');
    const multiBinaryInput = document.getElementById('multiBinaryInput');
    const multiOctalInput = document.getElementById('multiOctalInput');
    const multiHexInput = document.getElementById('multiHexInput');
    const finalResults = document.getElementById('finalResults');
    
    // 进制转换函数
    function convertNumber(value, fromBase) {
        const num = parseInt(value, fromBase);
        if (isNaN(num) || num < 0) {
            return null;
        }
        
        return {
            decimal: num.toString(10),
            binary: num.toString(2),
            octal: num.toString(8),
            hex: num.toString(16).toUpperCase()
        };
    }
    
    // 验证输入
    function validateInput(value, base) {
        if (!value) return true;
        
        switch (base) {
            case 10:
                return /^\d+$/.test(value);
            case 2:
                return /^[01]+$/.test(value);
            case 8:
                return /^[0-7]+$/.test(value);
            case 16:
                return /^[0-9A-Fa-f]+$/.test(value);
            default:
                return false;
        }
    }
    
    // 更新结果显示
    function updateResults(results) {
        if (!results) {
            finalResults.innerHTML = '';
            return;
        }
        
        finalResults.innerHTML = `
            <div class="result-item">
                <h5>十进制</h5>
                <p>${results.decimal}</p>
            </div>
            <div class="result-item">
                <h5>二进制</h5>
                <p>${results.binary}</p>
            </div>
            <div class="result-item">
                <h5>八进制</h5>
                <p>${results.octal}</p>
            </div>
            <div class="result-item">
                <h5>十六进制</h5>
                <p>${results.hex}</p>
            </div>
        `;
    }
    
    // 输入事件处理
    function handleInput(base) {
        return function() {
            const value = this.value;
            
            if (!validateInput(value, base)) {
                updateResults(null);
                return;
            }
            
            if (!value) {
                updateResults(null);
                return;
            }
            
            const results = convertNumber(value, base);
            if (results) {
                // 更新其他输入框
                multiDecimalInput.value = results.decimal;
                multiBinaryInput.value = results.binary;
                multiOctalInput.value = results.octal;
                multiHexInput.value = results.hex;
                
                // 更新结果显示
                updateResults(results);
            } else {
                updateResults(null);
            }
        };
    }
    
    // 为多进制输入框添加事件监听器
    if (multiDecimalInput) {
        multiDecimalInput.addEventListener('input', handleInput(10));
    }
    
    if (multiBinaryInput) {
        multiBinaryInput.addEventListener('input', handleInput(2));
    }
    
    if (multiOctalInput) {
        multiOctalInput.addEventListener('input', handleInput(8));
    }
    
    if (multiHexInput) {
        multiHexInput.addEventListener('input', handleInput(16));
    }
    
    // 评论功能
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const commentList = document.getElementById('commentList');
    
    // 从localStorage加载评论
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        commentList.innerHTML = '';
        
        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            
            // 创建评论头部
            const header = document.createElement('div');
            header.className = 'comment-header';
            
            const author = document.createElement('span');
            author.className = 'comment-author';
            author.textContent = `用户${comment.id}`;
            header.appendChild(author);
            
            const time = document.createElement('span');
            time.className = 'comment-time';
            time.textContent = comment.time;
            header.appendChild(time);
            
            // 创建评论内容
            const content = document.createElement('div');
            content.className = 'comment-content';
            content.textContent = comment.content;
            
            // 创建评论操作
            const actions = document.createElement('div');
            actions.className = 'comment-actions';
            
            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            likeBtn.setAttribute('data-id', comment.id);
            likeBtn.textContent = `点赞 (${comment.likes})`;
            actions.appendChild(likeBtn);
            
            const replyBtn = document.createElement('button');
            replyBtn.className = 'reply-btn';
            replyBtn.textContent = '回复';
            actions.appendChild(replyBtn);
            
            // 组装评论项
            commentItem.appendChild(header);
            commentItem.appendChild(content);
            commentItem.appendChild(actions);
            
            commentList.appendChild(commentItem);
        });
        
        // 添加点赞事件
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentId = parseInt(this.getAttribute('data-id'));
                likeComment(commentId);
            });
        });
    }
    
    // 点赞功能
    function likeComment(id) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const commentIndex = comments.findIndex(comment => comment.id === id);
        
        if (commentIndex !== -1) {
            comments[commentIndex].likes++;
            localStorage.setItem('comments', JSON.stringify(comments));
            loadComments();
        }
    }
    
    // 提交评论
    if (submitComment) {
        submitComment.addEventListener('click', function() {
            const content = commentInput.value.trim();
            if (content) {
                const comments = JSON.parse(localStorage.getItem('comments') || '[]');
                const newComment = {
                    id: Date.now(),
                    content: content,
                    time: new Date().toLocaleString(),
                    likes: 0
                };
                
                comments.push(newComment);
                localStorage.setItem('comments', JSON.stringify(comments));
                commentInput.value = '';
                loadComments();
            }
        });
    }
    
    // 初始加载评论
    loadComments();
    
    // 微信二维码显示功能
    const wechatLink = document.getElementById('wechatLink');
    const wechatQr = document.getElementById('wechatQr');
    
    if (wechatLink && wechatQr) {
        wechatLink.addEventListener('click', function(e) {
            e.preventDefault();
            wechatQr.style.display = wechatQr.style.display === 'block' ? 'none' : 'block';
        });
        
        // 点击其他地方关闭二维码
        document.addEventListener('click', function(e) {
            if (!wechatLink.contains(e.target) && !wechatQr.contains(e.target)) {
                wechatQr.style.display = 'none';
            }
        });
    }

    // 快速转换功能
    const quickDecimalInput = document.getElementById('quickDecimalInput');
    const quickBinaryInput = document.getElementById('quickBinaryInput');
    const quickDecimalResult = document.getElementById('quickDecimalResult');
    const quickBinaryResult = document.getElementById('quickBinaryResult');
    
    // 十进制转二进制（快速版）
    if (quickDecimalInput) {
        quickDecimalInput.addEventListener('input', function() {
            const decimal = parseInt(this.value);
            if (isNaN(decimal) || decimal < 0) {
                if (this.value) {
                    quickDecimalResult.textContent = '请输入非负整数';
                    quickDecimalResult.className = 'quick-result error';
                } else {
                    quickDecimalResult.textContent = '';
                    quickDecimalResult.className = 'quick-result';
                }
                return;
            }
            
            let binary = '';
            let num = decimal;
            
            if (num === 0) {
                binary = '0';
            } else {
                while (num > 0) {
                    const remainder = num % 2;
                    binary = remainder + binary;
                    num = Math.floor(num / 2);
                }
            }
            
            quickDecimalResult.textContent = `二进制结果：${binary}`;
            quickDecimalResult.className = 'quick-result success';
        });
    }
    
    // 二进制转十进制（快速版）
    if (quickBinaryInput) {
        quickBinaryInput.addEventListener('input', function() {
            const binary = this.value;
            // 验证输入是否为二进制
            if (!/^[01]+$/.test(binary)) {
                if (binary) {
                    quickBinaryResult.textContent = '请输入二进制数';
                    quickBinaryResult.className = 'quick-result error';
                } else {
                    quickBinaryResult.textContent = '';
                    quickBinaryResult.className = 'quick-result';
                }
                return;
            }
            
            let decimal = 0;
            for (let i = 0; i < binary.length; i++) {
                const digit = parseInt(binary[binary.length - 1 - i]);
                const weight = Math.pow(2, i);
                decimal += digit * weight;
            }
            
            quickBinaryResult.textContent = `十进制结果：${decimal}`;
            quickBinaryResult.className = 'quick-result success';
        });
    }

    // 微课观看按钮点击事件
    const watchBtns = document.querySelectorAll('.watch-btn');
    watchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 隐藏所有内容区域和模块
            contentSections.forEach(section => section.classList.remove('active'));
            convertModule.style.display = 'none';
            // 隐藏主页内容
            homeContent.style.display = 'none';
            // 显示视频模块
            videoModule.style.display = 'block';
            // 滚动到模块顶部
            videoModule.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 核心优势卡片点击事件
    const visualConvertCard = document.getElementById('visualConvertCard');
    const microCourseCard = document.getElementById('microCourseCard');
    const commentCard = document.getElementById('commentCard');
    
    // 可视化转换卡片点击事件
    if (visualConvertCard) {
        visualConvertCard.addEventListener('click', function() {
            // 隐藏所有内容区域和模块
            contentSections.forEach(section => section.classList.remove('active'));
            videoModule.style.display = 'none';
            // 隐藏主页内容
            homeContent.style.display = 'none';
            // 显示进制转换模块
            convertModule.style.display = 'block';
            // 滚动到模块顶部
            convertModule.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // 精品微课教学卡片点击事件
    if (microCourseCard) {
        microCourseCard.addEventListener('click', function() {
            // 隐藏所有内容区域和模块
            contentSections.forEach(section => section.classList.remove('active'));
            convertModule.style.display = 'none';
            // 隐藏主页内容
            homeContent.style.display = 'none';
            // 显示视频模块
            videoModule.style.display = 'block';
            // 滚动到模块顶部
            videoModule.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // 评论互动答疑卡片点击事件
    if (commentCard) {
        commentCard.addEventListener('click', function() {
            // 隐藏所有内容区域和模块
            contentSections.forEach(section => section.classList.remove('active'));
            convertModule.style.display = 'none';
            // 隐藏主页内容
            homeContent.style.display = 'none';
            // 显示视频模块
            videoModule.style.display = 'block';
            // 滚动到模块顶部
            videoModule.scrollIntoView({ behavior: 'smooth' });
            // 聚焦到评论区
            setTimeout(() => {
                const commentsSection = document.querySelector('.comments-section');
                if (commentsSection) {
                    commentsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    }

    // 完整工具链接点击事件
    const fullToolLink = document.getElementById('fullToolLink');
    if (fullToolLink) {
        fullToolLink.addEventListener('click', function(e) {
            e.preventDefault();
            // 隐藏所有内容区域和模块
            contentSections.forEach(section => section.classList.remove('active'));
            videoModule.style.display = 'none';
            // 隐藏主页内容
            homeContent.style.display = 'none';
            // 显示进制转换模块
            convertModule.style.display = 'block';
            // 滚动到模块顶部
            convertModule.scrollIntoView({ behavior: 'smooth' });
        });
    }

});