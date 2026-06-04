const groupLabels = [
            "1\nIA", "2\nIIA", "3\nIIIB", "4\nIVB", "5\nVB", "6\nVIB", "7\nVIIB", "8\nVIII", "9\nVIII", 
            "10\nVIII", "11\nIB", "12\nIIB", "13\nIIIA", "14\nIVA", "15\nVA", "16\nVIA", "17\nVIIA", "18\nVIIIA"
        ];

        const elementsData = [
            // Row 1
            [1, 1, 1, "H"], [2, 1, 18, "He"],
            // Row 2
            [3, 2, 1, "Li"], [4, 2, 2, "Be"], [5, 2, 13, "B"], [6, 2, 14, "C"], [7, 2, 15, "N"], [8, 2, 16, "O"], [9, 2, 17, "F"], [10, 2, 18, "Ne"],
            // Row 3
            [11, 3, 1, "Na"], [12, 3, 2, "Mg"], [13, 3, 13, "Al"], [14, 3, 14, "Si"], [15, 3, 15, "P"], [16, 3, 16, "S"], [17, 3, 17, "Cl"], [18, 3, 18, "Ar"],
            // Row 4
            [19, 4, 1, "K"], [20, 4, 2, "Ca"], [21, 4, 3, "Sc"], [22, 4, 4, "Ti"], [23, 4, 5, "V"], [24, 4, 6, "Cr"], [25, 4, 7, "Mn"], [26, 4, 8, "Fe"], [27, 4, 9, "Co"],
            [28, 4, 10, "Ni"], [29, 4, 11, "Cu"], [30, 4, 12, "Zn"], [31, 4, 13, "Ga"], [32, 4, 14, "Ge"], [33, 4, 15, "As"], [34, 4, 16, "Se"], [35, 4, 17, "Br"], [36, 4, 18, "Kr"],
            // Row 5
            [37, 5, 1, "Rb"], [38, 5, 2, "Sr"], [39, 5, 3, "Y"], [40, 5, 4, "Zr"], [41, 5, 5, "Nb"], [42, 5, 6, "Mo"], [43, 5, 7, "Tc"], [44, 5, 8, "Ru"], [45, 5, 9, "Rh"],
            [46, 5, 10, "Pd"], [47, 5, 11, "Ag"], [48, 5, 12, "Cd"], [49, 5, 13, "In"], [50, 5, 14, "Sn"], [51, 5, 15, "Sb"], [52, 5, 16, "Te"], [53, 5, 17, "I"], [54, 5, 18, "Xe"],
            // Row 6
            [55, 6, 1, "Cs"], [56, 6, 2, "Ba"], [57, 6, 3, "La"], 
            [72, 6, 4, "Hf"], [73, 6, 5, "Ta"], [74, 6, 6, "W"], [75, 6, 7, "Re"], [76, 6, 8, "Os"], [77, 6, 9, "Ir"], [78, 6, 10, "Pt"], [79, 6, 11, "Au"], 
            [80, 6, 12, "Hg"], [81, 6, 13, "Tl"], [82, 6, 14, "Pb"], [83, 6, 15, "Bi"], [84, 6, 16, "Po"], [85, 6, 17, "At"], [86, 6, 18, "Rn"],
            // Row 7
            [87, 7, 1, "Fr"], [88, 7, 2, "Ra"], [89, 7, 3, "Ac"], 
            [104, 7, 4, "Rf"], [105, 7, 5, "Db"], [106, 7, 6, "Sg"], [107, 7, 7, "Bh"], [108, 7, 8, "Hs"], [109, 7, 9, "Mt"], [110, 7, 10, "Ds"], 
            [111, 7, 11, "Rg"], [112, 7, 12, "Cn"], [113, 7, 13, "Nh"], [114, 7, 14, "Fl"], [115, 7, 15, "Mc"], [116, 7, 16, "Lv"], [117, 7, 17, "Ts"], [118, 7, 18, "Og"],
            
            // Detached f-block rows
            [58, 9, 4, "Ce"], [59, 9, 5, "Pr"], [60, 9, 6, "Nd"], [61, 9, 7, "Pm"], [62, 9, 8, "Sm"], [63, 9, 9, "Eu"], [64, 9, 10, "Gd"], 
            [65, 9, 11, "Tb"], [66, 9, 12, "Dy"], [67, 9, 13, "Ho"], [68, 9, 14, "Er"], [69, 9, 15, "Tm"], [70, 9, 16, "Yb"], [71, 9, 17, "Lu"],
            
            [90, 10, 4, "Th"], [91, 10, 5, "Pa"], [92, 10, 6, "U"], [93, 10, 7, "Np"], [94, 10, 8, "Pu"], [95, 10, 9, "Am"], [96, 10, 10, "Cm"], 
            [97, 10, 11, "Bk"], [98, 10, 12, "Cf"], [99, 10, 13, "Es"], [100, 10, 14, "Fm"], [101, 10, 15, "Md"], [102, 10, 16, "No"], [103, 10, 17, "Lr"]
        ];

        const inputGridMap = {};
        const table = document.getElementById('table');

        let savedProgress = JSON.parse(localStorage.getItem('pt_progress')) || {};
        let savedStars = JSON.parse(localStorage.getItem('pt_stars')) || [];
        let mistakeTracker = JSON.parse(localStorage.getItem('pt_mistake_counts')) || {};
        
        // Visibility state controller
        let showResults = false;

        // 1. Generate Headers
        groupLabels.forEach((label, index) => {
            const div = document.createElement('div');
            div.className = 'group-label';
            const headingColumnPlacement = index >= 3 ? index + 3 : index + 2;
            div.style.gridArea = `1 / ${headingColumnPlacement}`;
            div.innerText = label;
            table.appendChild(div);
        });

        for (let p = 1; p <= 7; p++) {
            const div = document.createElement('div');
            div.className = 'period-label';
            div.style.gridArea = `${p + 1} / 1`;
            div.innerText = p;
            table.appendChild(div);
        }

        // 2. Structural Bridges
        const lBridge = document.createElement('div');
        lBridge.className = 'f-block-bridge lanthanoid-bridge';
        lBridge.style.gridArea = '7 / 5'; 
        lBridge.innerHTML = "58–71<br>▼";
        table.appendChild(lBridge);

        const aBridge = document.createElement('div');
        aBridge.className = 'f-block-bridge actinoid-bridge';
        aBridge.style.gridArea = '8 / 5'; 
        aBridge.innerHTML = "90–103<br>▼";
        table.appendChild(aBridge);

        const lTag = document.createElement('div');
        lTag.className = 'f-block-row-tag';
        lTag.style.gridArea = '10 / 2 / 10 / 5'; 
        lTag.style.color = '#0891b2';
        lTag.innerText = "Lanthanoids (58-71) ➔";
        table.appendChild(lTag);

        const aTag = document.createElement('div');
        aTag.className = 'f-block-row-tag';
        aTag.style.gridArea = '11 / 2 / 11 / 5'; 
        aTag.style.color = '#c026d3';
        aTag.innerText = "Actinoids (90-103) ➔";
        table.appendChild(aTag);

        // 3. Generate Elements
        elementsData.forEach(([atomicNum, row, col, symbol]) => {
            const div = document.createElement('div');
            div.className = 'element';
            
            let gridColumn = (row >= 9) ? col + 2 : (col >= 4 ? col + 2 : col + 1);
            
            div.style.gridArea = `${row + 1} / ${gridColumn}`;
            div.setAttribute('data-atomic', atomicNum);

            if (savedStars.includes(atomicNum.toString())) {
                div.classList.add('starred');
            }

            const numSpan = document.createElement('span');
            numSpan.className = 'atomic-number';
            numSpan.innerText = atomicNum;
            div.appendChild(numSpan);

            const starSpan = document.createElement('span');
            starSpan.className = 'star-badge';
            starSpan.innerHTML = '&#9733;';
            div.appendChild(starSpan);

            const countSpan = document.createElement('span');
            countSpan.className = 'mistake-counter';
            countSpan.id = `count-${atomicNum}`;
            div.appendChild(countSpan);

            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 3;
            input.setAttribute('data-answer', symbol);
            input.setAttribute('data-row', row);
            input.setAttribute('data-col', col);
            
            if (savedProgress[atomicNum]) {
                input.value = savedProgress[atomicNum];
            }

            input.addEventListener('input', () => {
                savedProgress[atomicNum] = input.value;
                localStorage.setItem('pt_progress', JSON.stringify(savedProgress));
                
                div.style.backgroundColor = '';
                div.style.borderColor = '';
                countSpan.style.display = 'none';
            });

            // Fast Enter Capture
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkAnswers();
                }
            });

            div.appendChild(input);
            table.appendChild(div);
            inputGridMap[`${row},${col}`] = input;

            // Run tint analysis (will resolve to empty styles since showResults starts as false)
            revealVisualTint(div, atomicNum);

            div.addEventListener('dblclick', (e) => {
                e.preventDefault();
                div.classList.toggle('starred');
                const currentStars = JSON.parse(localStorage.getItem('pt_stars')) || [];
                const aNumStr = atomicNum.toString();

                if (div.classList.contains('starred')) {
                    if (!currentStars.includes(aNumStr)) currentStars.push(aNumStr);
                } else {
                    const index = currentStars.indexOf(aNumStr);
                    if (index > -1) currentStars.splice(index, 1);
                }
                localStorage.setItem('pt_stars', JSON.stringify(currentStars));
            });
        });

        function revealVisualTint(elementDiv, atomicNum) {
            const errorCount = mistakeTracker[atomicNum] || 0;
            const countBadge = document.getElementById(`count-${atomicNum}`);

            // Only reveal the heatmap colors and mistake counter if results are currently visible
            if (showResults && errorCount > 0 && countBadge) {
                countBadge.innerText = `×${errorCount}`;
                countBadge.style.display = 'block';

                const calculationFactor = Math.min(errorCount * 18, 90); 
                elementDiv.style.backgroundColor = `hsl(54, ${20 + calculationFactor}%, ${90 - (calculationFactor/4)}%)`;
                elementDiv.style.borderColor = `hsl(45, ${40 + calculationFactor}%, 60%)`;
            } else {
                if (countBadge) countBadge.style.display = 'none';
                elementDiv.style.backgroundColor = '';
                elementDiv.style.borderColor = '';
            }
        }

        function checkAnswers() {
            const elements = document.querySelectorAll('.element');

            // Grade user elements
            elements.forEach(element => {
                const input = element.querySelector('input');
                if (!input) return;

                const userVal = input.value.trim();
                const correctVal = input.getAttribute('data-answer');
                const atomicNum = element.getAttribute('data-atomic');

                element.classList.remove('correct', 'incorrect');

                if (userVal === "") return;
                
                if (userVal.toLowerCase() === correctVal.toLowerCase()) {
                    element.classList.add('correct');
                } else {
                    element.classList.add('incorrect');
                    mistakeTracker[atomicNum] = (mistakeTracker[atomicNum] || 0) + 1;
                }
            });

            // Unlock and reveal accuracy tracking visualizations
            showResults = true;
            document.body.classList.add('show-results');

            localStorage.setItem('pt_mistake_counts', JSON.stringify(mistakeTracker));

            setTimeout(() => {
                elements.forEach(element => {
                    const atomicNum = element.getAttribute('data-atomic');
                    element.classList.remove('correct', 'incorrect'); 
                    revealVisualTint(element, atomicNum);
                });
            }, 1500); 
        }

        function clearCurrentBoard() {
            savedProgress = {};
            localStorage.removeItem('pt_progress');
            
            // Hide metrics again when starting fresh
            showResults = false;
            document.body.classList.remove('show-results');
            
            const elements = document.querySelectorAll('.element');
            elements.forEach(element => {
                element.classList.remove('correct', 'incorrect');
                element.style.backgroundColor = '';
                element.style.borderColor = '';
                
                const countBadge = element.querySelector('.mistake-counter');
                if (countBadge) countBadge.style.display = 'none';

                const input = element.querySelector('input');
                if (input) input.value = '';
                
                const atomicNum = element.getAttribute('data-atomic');
                revealVisualTint(element, atomicNum);
            });
        }

        function resetAllMemory() {
            if (!confirm("Are you sure you want to completely erase all historical mistake data and stars?")) return;
            
            localStorage.clear();
            savedProgress = {};
            savedStars = [];
            mistakeTracker = {};
            
            // Revert state
            showResults = false;
            document.body.classList.remove('show-results');
            
            const elements = document.querySelectorAll('.element');
            elements.forEach(element => {
                element.classList.remove('correct', 'incorrect', 'starred');
                element.style.backgroundColor = '';
                element.style.borderColor = '';
                
                const countBadge = element.querySelector('.mistake-counter');
                if (countBadge) countBadge.style.display = 'none';

                const input = element.querySelector('input');
                if (input) input.value = '';
            });
        }

        // Navigation Engine
        table.addEventListener('keydown', (e) => {
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
            const activeInput = document.activeElement;
            if (!activeInput || activeInput.tagName !== 'INPUT') return;

            let currentRow = parseInt(activeInput.getAttribute('data-row'));
            let currentCol = parseInt(activeInput.getAttribute('data-col'));
            let nextRow = currentRow;
            let nextCol = currentCol;

            switch (e.key) {
                case 'ArrowUp':
                    do { nextRow--; } while (nextRow >= 1 && !inputGridMap[`${nextRow},${currentCol}`]);
                    break;
                case 'ArrowDown':
                    do { nextRow++; } while (nextRow <= 10 && !inputGridMap[`${nextRow},${currentCol}`]);
                    break;
                case 'ArrowLeft':
                    do { nextCol--; } while (nextCol >= 1 && !inputGridMap[`${currentRow},${nextCol}`]);
                    if (nextCol < 1) {
                        let absoluteIndex = getLinearIndex(currentRow, currentCol) - 1;
                        if (absoluteIndex >= 0) { focusByLinearIndex(absoluteIndex); e.preventDefault(); return; }
                    }
                    break;
                case 'ArrowRight':
                    do { nextCol++; } while (nextCol <= 18 && !inputGridMap[`${currentRow},${nextCol}`]);
                    if (nextCol > 18) {
                        let absoluteIndex = getLinearIndex(currentRow, currentCol) + 1;
                        if (absoluteIndex < elementsData.length) { focusByLinearIndex(absoluteIndex); e.preventDefault(); return; }
                    }
                    break;
            }

            const nextTarget = inputGridMap[`${nextRow},${nextCol}`];
            if (nextTarget && (nextRow !== currentRow || nextCol !== currentCol)) {
                nextTarget.focus();
                nextTarget.select();
                e.preventDefault();
            }
        });

        function getLinearIndex(r, c) { return elementsData.findIndex(el => el[1] === r && el[2] === c); }
        function focusByLinearIndex(idx) {
            const [num, r, c] = elementsData[idx];
            const target = inputGridMap[`${r},${c}`];
            if (target) { target.focus(); target.select(); }
        }

        function showFeaturesAlert() {
            const featureText = 
                "🧪 INTERACTIVE PERIODIC TABLE FEATURES:\n\n" +
                "1. Structural Reference Labels:\n" +
                "   • Columns feature dual Group tracking labels.\n" +
                "   • Rows track Period levels from 1 to 7 down the left margin.\n\n" +
                "2. f-Block Insertion Markers:\n" +
                "   • Color-coded anchor cells sit directly inside Group 3.\n\n" +
                "3. Conditional Accuracy Tints & Starred Items (Evaluation-Locked):\n" +
                "   • Mistakes register and cells are starred, but they remain HIDDEN during typing.\n" +
                "   • Hit 'Check Answers' to instantly review mistake heatmap counts (×3) and golden stars (★)!\n\n" +
                "4. Double-Click Star System:\n" +
                "   • Double-click any cell to tag it with a persistent study tracker (★).\n\n" +
                "5. Hotkeys:\n" +
                "   • Navigate grid gaps seamlessly with arrows; tap Enter anywhere to trigger immediate grading.";
            alert(featureText);
        }
