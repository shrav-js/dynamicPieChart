
var PieChart = function () {
        this.createChart = function (dataRetrieved) {
        var i, total = 0, colors = [], radius, labelradius, x, y, startAngle, endAngle, start, end, path, arc, angleInRadians;
        labels = [], values = [];
        for (i = 0; i < dataRetrieved.length; i++) {
            labels[i] = dataRetrieved[i].label;
            values[i] = dataRetrieved[i].value;
            colors[i] = dataRetrieved[i].color;
            total += values[i];
        }

        if (!svgNode) {
            svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgNode.setAttribute('style', 'width:100%; height:100%');
            document.body.appendChild(svgNode);
        }
        else {
            i = svgNode.childNodes.length - 1;
            while (svgNode.childNodes && i >= 0) {
                svgNode.removeChild(svgNode.childNodes[i]);
                i--;
            }
        }

        radius = 80;
        labelradius = 50 / 2;
        x = 100, y = 100;
        startAngle = 0;

        for (var i = 0; i < values.length; i++) {

            if (values[i] === 0) continue;
            document.body.appendChild(svgNode);

            endAngle = startAngle + values[i] / total * 360;
            if (endAngle === 360) {
                endAngle = 359.999;
            }
            start = getxy(x, y, radius, startAngle);
            end = getxy(x, y, radius, endAngle);

            g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arc = endAngle - startAngle > 180 ? 1 : 0;
            path.setAttribute('d', 'M' + end.x + ',' + end.y + 'A' + radius + ',' + radius + ',' + 0 + ',' + arc + ',' + 0 + ',' + start.x + ',' + start.y + 'L' + x + ',' + y + 'z');
            path.setAttribute('fill', colors[i]);
            g.setAttribute('id', values[i] + '_' + labels[i]);
            g.addEventListener("mouseenter", tooltip);
            g.addEventListener("mouseleave", removetooltip);
            g.appendChild(path);
            svgNode.appendChild(g);
            startAngle = endAngle;
        }
    };
    var svgNode, labels = [], values = [],
     
tooltip = function (event) {
        var text = event.currentTarget.id.split('_'),
        div = document.createElement('div'),
        div1,div2,
        x = event.x + 10;
        y = event.y + 10;
        event.currentTarget.addEventListener("mousemove", moveTooltip);
        div1 = document.createElement('div');
        div1.textContent = 'Label :' + text[1];
        div1.setAttribute('class', 'tooltiptext1');
        div.appendChild(div1);
        div2 = document.createElement('div');
        div2.textContent = 'value:' + text[0];
        div2.setAttribute('class', 'tooltiptext2');
        div.appendChild(div2);
       
        div.setAttribute('id', 'tooltip');
        div.setAttribute('class', 'tooltip');
        div.setAttribute('style', 'position:absolute; top: ' + y + '; left:' + x + ';');
        document.body.appendChild(div);

    },

      moveTooltip = function (event) {
        var div = document.getElementById('tooltip'),
        x = event.x + 10;
        y = event.y + 10;
        div.setAttribute('style', 'position:absolute; top: ' + y + '; left:' + x + ';');
       
    },
  
     removetooltip = function (event) {
        var div = document.getElementById('tooltip');
        document.body.removeChild(div);
        console.log('removetooltip');
    };

    var getxy = function (centerX, centerY, radius, angleInDegrees) {
        angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };
}

