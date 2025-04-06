document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalDetalhes");
    const modalNome = document.getElementById("modalNome");
    const modalPreco = document.getElementById("modalPreco");
    const modalImagem = document.getElementById("modalImagem");
    const modalDescricao = document.getElementById("modalDescricao");
    const tamanhoSelect = document.getElementById("tamanho");
    const saborCascaSelect = document.getElementById("saborCasca");
    const saborExtraSelect = document.getElementById("saborExtra");
    const tamanhoGroup = document.getElementById("tamanhoGroup");
    const saborCascaGroup = document.getElementById("saborCascaGroup");
    const saborExtraGroup = document.getElementById("saborExtraGroup");
    const btnsDetalhes = document.querySelectorAll(".btn-detalhes");
    const closeModal = document.querySelector(".close");
    const adicionarCarrinhoBtn = document.getElementById("adicionarCarrinho");
    const carrinhoContainer = document.getElementById("carrinho-container");
    const carrinhoLista = document.getElementById("carrinho-lista");
    const totalCarrinho = document.getElementById("total-carrinho");
    const finalizarPedidoBtn = document.getElementById("finalizarPedido");
    const notification = document.getElementById("notification");
    const toggleCarrinhoBtn = document.getElementById("toggle-carrinho");
    const carrinhoCount = document.getElementById("carrinho-count");
    
    let carrinho = loadCarrinho();
    
    atualizarCarrinho();
    updateCarrinhoCount();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    btnsDetalhes.forEach(btn => {
        btn.addEventListener("click", function () {
            showModal(this);
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    tamanhoSelect.addEventListener("change", atualizarPreco);
    saborCascaSelect.addEventListener("change", atualizarPreco);
    saborExtraSelect.addEventListener("change", atualizarPreco);

    adicionarCarrinhoBtn.addEventListener("click", function () {
        adicionarAoCarrinho();
    });

    toggleCarrinhoBtn.addEventListener("click", function() {
        carrinhoContainer.classList.toggle("collapsed");
        const icon = this.querySelector("i");
        if (carrinhoContainer.classList.contains("collapsed")) {
            icon.className = "fas fa-chevron-down";
        } else {
            icon.className = "fas fa-chevron-up";
        }
    });

    finalizarPedidoBtn.addEventListener("click", function () {
        finalizarPedido();
    });

    function showModal(btn) {
        const nomeProduto = btn.getAttribute("data-nome");
        const categoria = btn.getAttribute("data-categoria");
        const descricaoPadrao = btn.getAttribute("data-descricao") || "";
        
        modalNome.textContent = nomeProduto;
        modalImagem.src = btn.getAttribute("data-imagem");
        document.getElementById("infoOvinhos").style.display = "none";
        
        if (categoria === "degustacao") {
            setupDegustacaoModal();
        } else if (categoria === "barra") {
            setupBarraModal(btn.getAttribute("data-preco"));
        } else if (categoria === "coelhinho") {
            setupCoelhinhoModal(btn.getAttribute("data-preco"));
        } else if (categoria === "tradicionais" || categoria === "especiais") {
            setupOvosModal(categoria, btn.getAttribute("data-preco"));
        }
        
        modal.style.display = "block";
        modal.classList.add("fadeIn");
    }

    function setupDegustacaoModal() {
        modalPreco.textContent = "R$30,00";
        modalDescricao.textContent = "Kit com 4 sabores diferentes de ovinhos para degustação (50g cada)";
        document.getElementById("infoOvinhos").style.display = "block";
        
        tamanhoGroup.style.display = "none";
        saborCascaGroup.style.display = "none";
        saborExtraGroup.style.display = "none";
        
        produtoAtual = {
            nome: "Ovinhos para Degustação",
            preco: 30,
            opcoes: {
                tamanho: "Kit Degustação (4x50g)",
                saborCasca: "Variados",
                saborExtra: "Variados"
            },
            imagem: "img/mini.jpg"
        };
    }

    function setupBarraModal(preco) {
        const precoNum = parseFloat(preco);
        modalPreco.textContent = `R$${precoNum.toFixed(2)}`;
        modalDescricao.textContent = "Barra de chocolate ao leite. (Aproximadamente 250g).";
        

        tamanhoGroup.style.display = "none";
        saborCascaGroup.style.display = "none";
        saborExtraGroup.style.display = "block";
        
        document.getElementById("sabor").textContent = "Escolha o sabor:";
        
        saborExtraSelect.innerHTML = "";
        
        const sabores = [
            "Doce de leite com brownie", 
            "Ninho com Nutella", 
            "Oreo"
        ];
        
        sabores.forEach(sabor => {
            const option = document.createElement("option");
            option.value = sabor;
            option.textContent = sabor;
            saborExtraSelect.appendChild(option);
        });
        
        produtoAtual = {
            nome: "Barra de Chocolate Feliz Páscoa",
            preco: precoNum,
            opcoes: {
                tamanho: "Barra (Aproximadamente 250g)",
                saborCasca: "Ao Leite",
                saborExtra: saborExtraSelect.value
            },
            imagem: "img/barra.jpg"
        };
    }

    function setupCoelhinhoModal(preco) {
        const precoNum = parseFloat(preco);
        modalPreco.textContent = `R$${precoNum.toFixed(2)}`;
        modalDescricao.textContent = "Coelhinhos de chocolate ao leite. Embalagem com 2 unidades.";
        
        tamanhoGroup.style.display = "none";
        saborCascaGroup.style.display = "none";
        saborExtraGroup.style.display = "block";
        
        document.getElementById("sabor").textContent = "Escolha o sabor:";
        
        saborExtraSelect.innerHTML = "";
        
        const sabores = [
            "Brigadeiro", 
            "Bem-casado", 
            "Brigadeiro e Bem-casado"
        ];
        
        sabores.forEach(sabor => {
            const option = document.createElement("option");
            option.value = sabor;
            option.textContent = sabor;
            saborExtraSelect.appendChild(option);
        });
        
        produtoAtual = {
            nome: "Coelhinhos de Chocolate",
            preco: precoNum,
            opcoes: {
                tamanho: "Kit (2 unidades)",
                saborCasca: "Ao Leite",
                saborExtra: saborExtraSelect.value
            },
            imagem: "img/coelhinho.jpg"
        };
    }

    function setupOvosModal(categoria, precoBase) {
        tamanhoGroup.style.display = "block";
        saborCascaGroup.style.display = "block";
        saborExtraGroup.style.display = "none";
        
        if (categoria === "tradicionais") {
            modalDescricao.textContent = "Ovo de Páscoa tradicional com casca de chocolate e recheio cremoso.";
            
            // Preços para ovos tradicionais
            tamanhoSelect.innerHTML = "";
            const tamanhos = [
                {value: "150g", text: "150g - R$ 27,00", preco: 27},
                {value: "250g", text: "250g - R$ 37,00", preco: 37},
                {value: "350g", text: "350g - R$ 47,00", preco: 47}
            ];
            
            tamanhos.forEach(t => {
                const option = document.createElement("option");
                option.value = t.value;
                option.textContent = t.text;
                option.dataset.preco = t.preco;
                tamanhoSelect.appendChild(option);
            });
        } else if (categoria === "especiais") {
            modalDescricao.textContent = "Ovo de Páscoa especial com casca de chocolate e recheio premium.";
            
            // Preços para ovos especiais (corrigidos)
            tamanhoSelect.innerHTML = "";
            const tamanhos = [
                {value: "150g", text: "150g - R$ 35,00", preco: 35},
                {value: "250g", text: "250g - R$ 45,00", preco: 45},
                {value: "350g", text: "350g - R$ 55,00", preco: 55}
            ];
            
            tamanhos.forEach(t => {
                const option = document.createElement("option");
                option.value = t.value;
                option.textContent = t.text;
                option.dataset.preco = t.preco;
                tamanhoSelect.appendChild(option);
            });
        }
        
        atualizarPreco();
    }
    
    let produtoAtual = {
        nome: "",
        preco: 0,
        opcoes: {
            tamanho: "",
            saborCasca: "",
            saborExtra: ""
        },
        imagem: ""
    };
    
    function atualizarPreco() {
        if (tamanhoGroup.style.display !== "none") {
            let precoBase = parseFloat(tamanhoSelect.options[tamanhoSelect.selectedIndex].dataset.preco);
            const saborCasca = saborCascaSelect.value;
            
            if (saborCasca === "Brownie") {
                precoBase += 6;
            }
            
            modalPreco.textContent = `R$ ${precoBase.toFixed(2)}`;
            
            produtoAtual = {
                nome: modalNome.textContent,
                preco: precoBase,
                opcoes: {
                    tamanho: tamanhoSelect.value,
                    saborCasca: saborCascaSelect.value,
                    saborExtra: "N/A"
                },
                imagem: modalImagem.src
            };
        }
        else if (saborExtraGroup.style.display !== "none") {
            produtoAtual.opcoes.saborExtra = saborExtraSelect.value;
        }
    }
    
    function adicionarAoCarrinho() {
        if (tamanhoGroup.style.display !== "none") {
            produtoAtual.opcoes.tamanho = tamanhoSelect.value;
            produtoAtual.opcoes.saborCasca = saborCascaSelect.value;
        }
        
        if (saborExtraGroup.style.display !== "none") {
            produtoAtual.opcoes.saborExtra = saborExtraSelect.value;
        }
        
        const produtoID = `${produtoAtual.nome}-${produtoAtual.opcoes.tamanho}-${produtoAtual.opcoes.saborCasca}-${produtoAtual.opcoes.saborExtra}`;
        
        const existeIndex = carrinho.findIndex(item => item.id === produtoID);
        
        if (existeIndex !== -1) {
            carrinho[existeIndex].quantidade += 1;
        } else {
            carrinho.push({
                id: produtoID,
                nome: produtoAtual.nome,
                preco: produtoAtual.preco,
                opcoes: { ...produtoAtual.opcoes },
                quantidade: 1,
                imagem: produtoAtual.imagem
            });
        }
        
        saveCarrinho();
        atualizarCarrinho();
        updateCarrinhoCount();
        
        showNotification("Produto adicionado ao carrinho!");
        
        modal.style.display = "none";
    }
    
    function removerDoCarrinho(produtoID) {
        carrinho = carrinho.filter(item => item.id !== produtoID);
        saveCarrinho();
        atualizarCarrinho();
        updateCarrinhoCount();
        carrinhoContainer.classList.add("shake-animation");
        setTimeout(() => {
            carrinhoContainer.classList.remove("shake-animation");
        }, 500);
    }
    
    function atualizarCarrinho() {
        carrinhoLista.innerHTML = "";

        let total = 0;
        
        carrinho.forEach(item => {
            const itemTotal = item.preco * item.quantidade;
            total += itemTotal;
            
            const li = document.createElement("li");
            
            li.innerHTML = `
                <div class="item-details">
                    <div class="item-title">${item.nome} (${item.quantidade}x)</div>
                    <div class="item-options">
                        ${item.opcoes.tamanho} | ${item.opcoes.saborCasca}
                        ${item.opcoes.saborExtra !== "N/A" ? ` | ${item.opcoes.saborExtra}` : ""}
                    </div>
                </div>
                <span class="item-price">R$ ${(itemTotal).toFixed(2)}</span>
                <button class="btn-remover" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            
            carrinhoLista.appendChild(li);
        });
        
        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;

        document.querySelectorAll(".btn-remover").forEach(btn => {
            btn.addEventListener("click", function() {
                const produtoID = this.getAttribute("data-id");
                removerDoCarrinho(produtoID);
            });
        });
        
        if (carrinho.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "Seu carrinho está vazio";
            emptyMessage.style.textAlign = "center";
            emptyMessage.style.fontStyle = "italic";
            emptyMessage.style.color = "#888";
            carrinhoLista.appendChild(emptyMessage);
        }
    }
    
    function updateCarrinhoCount() {
        const count = carrinho.reduce((total, item) => total + item.quantidade, 0);
        carrinhoCount.textContent = `(${count})`;
    }
    
    function finalizarPedido() {
        if (carrinho.length === 0) {
            showNotification("Adicione itens ao carrinho para finalizar o pedido", "error");
            return;
        }
        
        let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
        
        carrinho.forEach(item => {
            mensagem += `*${item.nome}* (${item.quantidade}x)\n`;
            mensagem += `- ${item.opcoes.tamanho} | ${item.opcoes.saborCasca}`;
            if (item.opcoes.saborExtra !== "N/A") {
                mensagem += ` | ${item.opcoes.saborExtra}`;
            }
            mensagem += `\n- R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
        });
        
        const total = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        mensagem += `*Total: R$ ${total.toFixed(2)}*\n\n`;
        mensagem += "Poderia me informar os detalhes para entrega e pagamento?";
        
        const mensagemEncoded = encodeURIComponent(mensagem);
        const whatsappURL = `https://wa.me/5581983487852?text=${mensagemEncoded}`;
        
        window.open(whatsappURL, "_blank");
    }
    
    function showNotification(message, type = "success") {
        notification.textContent = message;
        notification.className = "notification";
        
        if (type === "error") {
            notification.style.backgroundColor = "#ff4747";
        } else {
            notification.style.backgroundColor = "#4CAF50";
        }
        
        notification.classList.add("show");
        
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }
    
    function saveCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
    
    function loadCarrinho() {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    }
});