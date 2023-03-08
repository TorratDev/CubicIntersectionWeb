using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace CubicIntersectionWeb.Pages;

public partial class Index : ComponentBase
{
    private Cubic Cubic1 { get; set; }
    private Cubic Cubic2 { get; set; }

    public Index()
    {
        var dimension = new Dimension(1, 1, 1);
        Cubic1 = new Cubic(dimension, new Center(1, 1, 0));
        Cubic2 = new Cubic(dimension, new Center(-1, 1, 0));
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JsRuntime.InvokeVoidAsync("setup", Cubic1, Cubic2);
        }
        else
        {
            await JsRuntime.InvokeVoidAsync("updateCube", Cubic1, Cubic2);
        }
    }
}