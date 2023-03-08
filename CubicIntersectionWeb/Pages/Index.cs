using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace CubicIntersectionWeb.Pages;

public partial class Index : ComponentBase
{
    private Cubic Cubic1 { get; set; }
    private Cubic Cubic2 { get; set; }
    private bool AreColliding { get; set; }
    private double VolumeIntercept { get; set; }

    public Index()
    {
        Cubic1 = new Cubic(new Dimension(1, 1, 1), new Center(1, 1, 0));
        Cubic2 = new Cubic(new Dimension(1, 1, 1), new Center(-1, 1, 0));
    }

    private async Task GetInterception()
    {
        var a = await Interceptor.GetIntersection(Cubic1, Cubic2);

        AreColliding = a.Item1;
        VolumeIntercept = a.Item2;
        Console.WriteLine(AreColliding);
        Console.WriteLine(VolumeIntercept);
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