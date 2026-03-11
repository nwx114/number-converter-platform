// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏功能
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.getElementById('logo');
    
    // Logo点击返回主页并显示二维码
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
        
        // 显示微信二维码
        const wechatQr = document.getElementById('wechatQr');
        if (wechatQr) {
            wechatQr.style.display = 'block';
        }
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
    function handleAnchorClick(e) {
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
    }
    
    // 处理导航栏链接
    const navAnchorLinks = document.querySelectorAll('.nav-links a');
    navAnchorLinks.forEach(link => {
        // 对于基础知识链接，点击返回主页
        if (link.classList.contains('dropbtn')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // 显示主页内容
                const convertModule = document.getElementById('convertModule');
                const videoModule = document.getElementById('videoModule');
                const contentSections = document.querySelectorAll('.content-section');
                const homeContent = document.getElementById('homeContent');
                
                convertModule.style.display = 'none';
                videoModule.style.display = 'none';
                contentSections.forEach(section => section.classList.remove('active'));
                homeContent.style.display = 'block';
                
                // 滚动到页面顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        } else {
            link.addEventListener('click', handleAnchorClick);
        }
    });
    
    // 处理页脚链接
    const footerAnchorLinks = document.querySelectorAll('.footer-section a');
    footerAnchorLinks.forEach(link => {
        // 为页脚产品服务链接添加特殊处理
        if (link.id === 'footerConvertLink') {
            // 进制转换链接点击事件
            link.addEventListener('click', function(e) {
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
        } else if (link.id === 'footerVideoLink') {
            // 微课学习链接点击事件
            link.addEventListener('click', function(e) {
                e.preventDefault();
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
        } else if (link.id === 'footerTestLink') {
            // 在线测试链接点击事件
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // 显示微信二维码
                const wechatQr = document.getElementById('wechatQr');
                if (wechatQr) {
                    wechatQr.style.display = 'block';
                }
            });
        } else {
            // 其他页脚链接使用默认处理
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
    

    
    // 微信二维码显示功能
    const wechatLink = document.getElementById('wechatLink');
    const wechatQr = document.getElementById('wechatQr');
    
    function toggleWechatQr() {
        if (wechatQr) {
            wechatQr.style.display = wechatQr.style.display === 'block' ? 'none' : 'block';
        }
    }
    
    if (wechatLink && wechatQr) {
        wechatLink.addEventListener('click', function(e) {
            e.preventDefault();
            // 确保主页内容显示
            const homeContent = document.getElementById('homeContent');
            if (homeContent) {
                homeContent.style.display = 'block';
            }
            // 隐藏所有模块
            const convertModule = document.getElementById('convertModule');
            const videoModule = document.getElementById('videoModule');
            if (convertModule) convertModule.style.display = 'none';
            if (videoModule) videoModule.style.display = 'none';
            // 隐藏所有内容区域
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.remove('active'));
            // 只显示/隐藏二维码，不改变主页面状态
            wechatQr.style.display = wechatQr.style.display === 'block' ? 'none' : 'block';
        });
    }
    

    
    // 点击其他地方关闭二维码
    document.addEventListener('click', function(e) {
        if (wechatQr && !wechatLink?.contains(e.target) && !wechatQr.contains(e.target)) {
            wechatQr.style.display = 'none';
        }
    });
    
    // 隐私政策和服务条款弹窗
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    const closeBtns = document.querySelectorAll('.modal .close');
    
    // 打开隐私政策弹窗
    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
        });
    }
    
    // 打开服务条款弹窗
    if (termsLink && termsModal) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.style.display = 'block';
        });
    }
    
    // 关闭弹窗
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === privacyModal) {
            privacyModal.style.display = 'none';
        }
        if (event.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });

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
    const multiConvertCard = document.querySelector('.advantage-card:nth-child(2)');
    
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
    
    // 多进制一键转换卡片点击事件
    if (multiConvertCard) {
        multiConvertCard.addEventListener('click', function() {
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