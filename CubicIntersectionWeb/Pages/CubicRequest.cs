namespace CubicIntersectionWeb.Pages;

public class CubicRequest
{
    public CubicRequest(Cubic first, Cubic second)
    {
        First = first;
        Second = second;
    }

    public Cubic First { get; set; }
    public Cubic Second { get; set; }
}