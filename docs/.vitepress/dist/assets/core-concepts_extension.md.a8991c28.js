import{_ as s,o as n,c as a,V as o}from"./chunks/framework.d3b95951.js";const A=JSON.parse('{"title":"Extension","description":"","frontmatter":{},"headers":[],"relativePath":"core-concepts/extension.md","filePath":"core-concepts/extension.md"}'),l={name:"core-concepts/extension.md"},e=o(`<h1 id="extension" tabindex="-1">Extension <a class="header-anchor" href="#extension" aria-label="Permalink to &quot;Extension&quot;">​</a></h1><p>Extensions are a way to extend the package with your own generators and tokenizers. This is useful if you want to generate something that is not supported by the package out of the box.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h2><p>In order to use extensions, you need to register them in the <code>config/arch.php</code> file. The <code>extensions</code> key is an array of fully qualified class names that implements the <code>BombenProdukt\\Arch\\Extension\\ExtensionInterface</code> interface. You can review the contents of the <code>config/arch.php</code> file <a href="https://github.com/faustbrian/laravel-arch/blob/main/config/arch.php#L136-L149" target="_blank" rel="noreferrer">here</a>.</p><h2 id="interface" tabindex="-1">Interface <a class="header-anchor" href="#interface" aria-label="Permalink to &quot;Interface&quot;">​</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">declare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">strict_types</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BombenProdukt</span><span style="color:#89DDFF;">\\</span><span style="color:#FFCB6B;">Arch</span><span style="color:#89DDFF;">\\</span><span style="color:#FFCB6B;">Contract</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExtensionInterface</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">register</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">array</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">configuration</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-php"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;?</span><span style="color:#A6ACCD;">php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">declare</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">strict_types</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">namespace</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">BombenProdukt</span><span style="color:#89DDFF;">\\</span><span style="color:#FFCB6B;">Arch</span><span style="color:#89DDFF;">\\</span><span style="color:#FFCB6B;">Extension</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> </span><span style="color:#A6ACCD;">BombenProdukt</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Arch</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Contract</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">ExtensionInterface</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> </span><span style="color:#A6ACCD;">BombenProdukt</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Arch</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Facade</span><span style="color:#89DDFF;">\\</span><span style="color:#A6ACCD;">Environment</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">LaravelExtension</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExtensionInterface</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">register</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">array</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">configuration</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">void</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">foreach</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">configuration</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">generators</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">generator</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">Environment</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">generators</span><span style="color:#89DDFF;">()-&gt;</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">generator</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">foreach</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">configuration</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">statements</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">statement</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">Environment</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">statements</span><span style="color:#89DDFF;">()-&gt;</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">statement</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">foreach</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">configuration</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tokenizers</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">tokenizerClassName </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">tokenizerConfiguration</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(\\</span><span style="color:#82AAFF;">is_string</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">tokenizerClassName</span><span style="color:#89DDFF;">))</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#FFCB6B;">Environment</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">tokenizers</span><span style="color:#89DDFF;">()-&gt;</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">tokenizerClassName</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">tokenizerConfiguration</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#FFCB6B;">Environment</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">tokenizers</span><span style="color:#89DDFF;">()-&gt;</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">($</span><span style="color:#A6ACCD;">tokenizerConfiguration</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><ul><li><a href="https://github.com/faustbrian/laravel-arch/tree/main/src/Extension/InertiaExtension.php" target="_blank" rel="noreferrer">InertiaExtension</a></li><li><a href="https://github.com/faustbrian/laravel-arch/tree/main/src/Extension/Laravel/NovaExtension.php" target="_blank" rel="noreferrer">Laravel/NovaExtension</a></li><li><a href="https://github.com/faustbrian/laravel-arch/tree/main/src/Extension/LaravelExtension.php" target="_blank" rel="noreferrer">LaravelExtension</a></li><li><a href="https://github.com/faustbrian/laravel-arch/tree/main/src/Extension/LivewireExtension.php" target="_blank" rel="noreferrer">LivewireExtension</a></li></ul>`,10),p=[e];function t(r,c,D,F,y,i){return n(),a("div",null,p)}const h=s(l,[["render",t]]);export{A as __pageData,h as default};