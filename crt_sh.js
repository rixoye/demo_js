// ==UserScript==
// @name         SSL_DOMAIN
// @namespace    https://github.com/rixoye/demo_js
// @version      0.2
// @description  输出ssl的查询结果
// @author       rixoye
// @include      https://crt.sh/?Identity=*
// @license      AGPL-3.0
// ==/UserScript==

(() => {
    "use strict";
    let domain_set = new Set();
    setTimeout(() => {
        getDomain();
    }, 2000);
    function getDomain(){
        const elements = document.querySelectorAll("table>tbody>tr>td>table tr td:nth-last-of-type(2)")
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (element.childElementCount === 0) {
                    //只有一个子域名
                    const raw = element.innerText?.trim();
                    domain_set.add(raw);
                }else{
                    //有多个子域名
                    const nodes = element.childNodes;
                    for (let j = 0; j < nodes.length; j++) {
                        const node = nodes[j];
                        if (node.nodeType === Node.TEXT_NODE) {
                        const raw = node.textContent?.trim();
                        domain_set.add(raw);
                        }
                    }
                }
            }
        }

        for(let d of domain_set){
            console.log(d);
        }
    }
})();