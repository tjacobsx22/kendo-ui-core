(function(f, define){
    define([ "./kendo.data"], f);
})(function(){

var __meta__ = {
    id: "ganttchart",
    name: "GanttChart",
    category: "web",
    description: "The Gantt-chart component.",
    depends: [ "data" ]
};

(function($, undefined) {

    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var DataSource = kendo.data.DataSource;
    var HierarchicalDataSource = kendo.data.HierarchicalDataSource;
    var isArray = $.isArray;
    var proxy = $.proxy;
    var extend = $.extend;

    var GanttChartDataSource = HierarchicalDataSource.extend({
        init: function(options) {
            HierarchicalDataSource.fn.init.call(this, options);
        }
    });

    GanttChartDataSource.create = function(options) {
        options = isArray(dataSource) ? { data: options } : options;

        var dataSource = options || {};
        var data = dataSource.data;

        dataSource.data = data;

        if (!(dataSource instanceof GanttChartDataSource) && dataSource instanceof kendo.data.DataSource) {
            throw new Error("Incorrect DataSource type. Only GanttChartDataSource instances are supported");
        }

        return dataSource instanceof GanttChartDataSource ? dataSource : new GanttChartDataSource(dataSource);
    };

    extend(true, kendo.data, {
       GanttChartDataSource: GanttChartDataSource
    });

    var GanttChart = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._dataSource();

            kendo.notify(this);
        },

        events: [ ],

        options: {
            name: "GanttChart"
        },

        _dataSource: function() {
            var options = this.options;
            var dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (this.dataSource && this._refreshHandler) {
                this.dataSource
                    .unbind("change", this._refreshHandler)
                    .unbind("progress", this._progressHandler)
                    .unbind("error", this._errorHandler);
            } else {
                this._refreshHandler = proxy(this.refresh, this);
                this._progressHandler = proxy(this._requestStart, this);
                this._errorHandler = proxy(this._error, this);
            }

            this.dataSource = kendo.data.GanttChartDataSource.create(dataSource)
                .bind("change", this._refreshHandler)
                .bind("progress", this._progressHandler)
                .bind("error", this._errorHandler);
        },

        refresh: function(e) {

        },

        _requestStart: function() {

        },

        _error: function() {

        }

    });

    kendo.ui.plugin(GanttChart);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
