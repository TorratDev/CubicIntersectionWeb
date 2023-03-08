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
        Cubic1 = new Cubic();
        Console.WriteLine(Cubic1);

        Cubic2 = new Cubic();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        Console.WriteLine(Cubic1);
        Console.WriteLine(Cubic2);
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