import os, re, sys
root = sys.argv[1]

def rel_for(d): return '../' * d or './'

def fix(p, d):
    t = p.lstrip('/')
    if t == '' or t.endswith('/'): t += 'index.html'
    return rel_for(d) + t

n = 0
for dirpath, _, files in os.walk(root):
    for fn in files:
        if not fn.endswith(('.html', '.css', '.xml')): continue
        fp = os.path.join(dirpath, fn)
        d = len(os.path.relpath(fp, root).split(os.sep)) - 1
        s = o = open(fp, encoding='utf-8').read()
        if fn.endswith('.html'):
            s = re.sub(r'\b(href|src)="(/(?!/)[^"]*)"',
                       lambda m: '%s="%s"' % (m.group(1), fix(m.group(2), d)), s)
            def rset(m):
                out = []
                for it in m.group(1).split(','):
                    it = it.strip()
                    if it.startswith('/') and not it.startswith('//'):
                        b = it.split(None, 1); b[0] = fix(b[0], d); it = ' '.join(b)
                    out.append(it)
                return 'srcset="%s"' % ', '.join(out)
            s = re.sub(r'srcset="([^"]*)"', rset, s)
        elif fn.endswith('.css'):
            s = re.sub(r'url\((["\']?)(/(?!/)[^"\')]*)\1\)',
                       lambda m: 'url(%s%s%s)' % (m.group(1), fix(m.group(2), d), m.group(1)), s)
        if s != o:
            open(fp, 'w', encoding='utf-8').write(s); n += 1
print("  relativized %d files" % n)
